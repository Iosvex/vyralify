const functions=require('firebase-functions/v1');const admin=require('firebase-admin');const Stripe=require('stripe');const Razorpay=require('razorpay');const crypto=require('crypto');admin.initializeApp();const db=admin.firestore();
const cors=(res)=>{res.set('Access-Control-Allow-Origin','*');res.set('Access-Control-Allow-Headers','Authorization, Content-Type');res.set('Access-Control-Allow-Methods','POST, OPTIONS')};
async function identity(req){const h=req.get('Authorization')||'';if(!h.startsWith('Bearer '))throw Error('unauthenticated');return admin.auth().verifyIdToken(h.slice(7))}async function profile(uid){const s=await db.doc(`users/${uid}`).get();return s.data()||{}}function jsonError(res,status){return res.status(status).json({error:'Request could not be completed.'})}
const emailKey=e=>String(e||'').trim().toLowerCase();async function recordPaid(email,provider,id){const key=emailKey(email);if(!key)return;await db.doc(`paidEmails/${key}`).set({email:key,provider,subscriptionId:id||null,status:'paid',paidAt:admin.firestore.FieldValue.serverTimestamp(),updatedAt:admin.firestore.FieldValue.serverTimestamp()},{merge:true})}

exports.onUserCreate=functions.auth.user().onCreate(async user=>{
  const ref=db.doc(`users/${user.uid}`);
  // Since anyone who signs up paid via Cashfree, they get active (premium) tier directly.
  await ref.set({
    email:user.email||'',
    displayName:user.displayName||'',
    role:'member',
    tier:'active',
    country:'',
    currency:'INR',
    billingProvider:'cashfree',
    subscriptionId:null,
    subscriptionStatus:'active',
    affiliateCode:user.uid.slice(0,8).toUpperCase(),
    referredBy:null,
    onboardingTrack:null,
    aiUsage:{count:0,resetAt:admin.firestore.Timestamp.fromDate(new Date(Date.now()+86400000))},
    createdAt:admin.firestore.FieldValue.serverTimestamp(),
    updatedAt:admin.firestore.FieldValue.serverTimestamp()
  },{merge:true});
  await db.doc(`affiliates/${user.uid.slice(0,8).toUpperCase()}`).set({ownerUid:user.uid,clicks:0,signups:0,conversions:0,createdAt:admin.firestore.FieldValue.serverTimestamp()});
});

exports.generateAi=functions.https.onRequest(async(req,res)=>{
  cors(res);
  if(req.method==='OPTIONS')return res.status(204).send('');
  if(req.method!=='POST')return jsonError(res,405);
  try{
    const token=await identity(req),p=await profile(token.uid),tool=String(req.body.tool||''),prompt=String(req.body.prompt||'').trim().slice(0,4000);
    if(p.tier!=='active'||!prompt)return jsonError(res,403);
    const now=Date.now(),usage=p.aiUsage||{},reset=usage.resetAt?.toMillis?.()||0,count=reset>now?(usage.count||0):0;
    if(count>=3)return res.status(429).json({error:'Daily limit of 3 AI generations reached.'});
    
    const key=process.env.GROQ_API_KEY;
    if(!key)return jsonError(res,503);
    
    const endpoint='https://api.groq.com/openai/v1/chat/completions';
    // Use high quality model llama-3.1-70b-versatile
    const model='llama-3.1-70b-versatile';
    
    const r=await fetch(endpoint,{
      method:'POST',
      headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},
      body:JSON.stringify({
        model,
        messages:[
          {role:'system',content:`You are Vyralify's creator assistant. Produce a practical ${tool} for an Instagram theme-page creator. Make it engaging, viral, and actionable. Output only the requested content without metadata or conversational filler.`},
          {role:'user',content:prompt}
        ],
        temperature:0.75,
        max_tokens:800
      })
    });
    if(!r.ok) {
      console.error('Groq provider error:', await r.text());
      throw Error('provider');
    }
    const data=await r.json(),output=data.choices?.[0]?.message?.content;
    if(!output)throw Error('empty');
    
    await db.doc(`users/${token.uid}`).update({
      'aiUsage.count':count+1,
      'aiUsage.resetAt':admin.firestore.Timestamp.fromDate(new Date(reset>now?reset:now+86400000)),
      updatedAt:admin.firestore.FieldValue.serverTimestamp()
    });
    await db.collection('aiGenerations').add({
      uid:token.uid,
      tool,
      timestamp:admin.firestore.FieldValue.serverTimestamp(),
      tokenCount:data.usage?.total_tokens||null
    });
    return res.json({output})
  }catch(e){
    console.error('generateAi',e.message);
    return jsonError(res,e.message==='unauthenticated'?401:500)
  }
});

exports.createCheckout=functions.https.onRequest(async(req,res)=>{
  cors(res);
  if(req.method==='OPTIONS')return res.status(204).send('');
  if(req.method!=='POST')return jsonError(res,405);
  // Replaced by Cashfree hosted payment form.
  return res.json({url:'https://payments.cashfree.com/forms/vyralifyio'});
});

exports.startCheckout=functions.https.onRequest(async(req,res)=>{
  cors(res);
  if(req.method==='OPTIONS')return res.status(204).send('');
  if(req.method!=='POST')return jsonError(res,405);
  // Replaced by Cashfree hosted payment form.
  return res.json({url:'https://payments.cashfree.com/forms/vyralifyio'});
});

exports.verifyAccess=functions.https.onRequest(async(req,res)=>{
  cors(res);
  if(req.method==='OPTIONS')return res.status(204).send('');
  // All signups are allowed, so verifyAccess always returns ok:true
  const q=req.method==='POST'?(req.body||{}):(req.query||{});
  const email=emailKey(q.email||'');
  return res.json({ok:true,email:email||'paid@vyralify.io'});
});

exports.completeSignup=functions.https.onRequest(async(req,res)=>{
  cors(res);
  if(req.method==='OPTIONS')return res.status(204).send('');
  if(req.method!=='POST')return jsonError(res,405);
  try{
    const token=await identity(req);
    const name=String(req.body.name||'').slice(0,80),country=String(req.body.country||'').toUpperCase().slice(0,4),track=['beginner','existing'].includes(req.body.track)?req.body.track:null;
    const india=country==='IN';
    await db.doc(`users/${token.uid}`).set({
      displayName:name,
      country,
      currency:india?'INR':'USD',
      billingProvider:'cashfree',
      onboardingTrack:track,
      tier:'active',
      subscriptionStatus:'active',
      subscriptionId:null,
      updatedAt:admin.firestore.FieldValue.serverTimestamp()
    },{merge:true});
    return res.json({ok:true,active:true})
  }catch(e){
    console.error('completeSignup',e.message);
    return jsonError(res,e.message==='unauthenticated'?401:500)
  }
});

