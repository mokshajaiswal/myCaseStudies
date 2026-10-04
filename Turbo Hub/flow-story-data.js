/* Narrative fixtures: fictional family, separate from the research personas. */
(function (root) {
  const cast = {
    father: {name:'Arun',role:'Father · Hub manager',description:'Starts the shared space and sets the boundaries.',image:'father.png',bubble:{x:22.9,y:35,text:'Father · 52'}},
    mother: {name:'Kavya',role:'Mother · Co-manager',description:'Shares responsibility for the household’s money.',image:'mother.png',bubble:{x:47.1,y:35.3,tail:'right',text:'Mother · 48'}},
    daughter: {name:'Neha',role:'Daughter · 19 · Hub member',description:'Wants an allowance she can use independently.',image:'daughter.png',bubble:{x:59.2,y:36.7,tail:'left',text:'Daughter · 19'}},
    son: {name:'Rohan',role:'Son · 22 · Hub member',description:'Manages college expenses with family support.',image:'son.png',bubble:{x:80.7,y:16.6,text:'Son · 22'}}
  };
  const scene = (id,actor,title,copy,route,options={}) => ({id,actor,title,copy,route,interactive:false,placement:'lower-corner',...options});
  // A flow groups consecutive screens into one story beat: the beat, a carousel of its
  // screens, then a boxed design rationale. Screens keep their own fixture options.
  // Sections carry no illustration unless one is set here; the page backdrop shows whose story it is.
  const flow = (id,actor,title,copy,rationale,sequence,options={}) => scene(id,actor,title,copy,sequence[0].route,{placement:'home-scene',designRationale:rationale,sequence,...options});
  const screen = (id,title,route,copy,options={}) => ({id,title,route,copy,...options});
  const chapters = [
    {id:'create',title:'A shared place for the Sharma family’s money',intro:'Neha wants an allowance; Rohan has college expenses. Arun and Kavya decide to set up a family Hub to support their independence, and Arun starts it on PayZapp.',scenes:[
      scene('accounts-cards','father','Discover Turbo Hub and get started','Arun wants to support his children’s everyday spending, so he opens PayZapp, finds Turbo Hub on the Accounts & Cards page and taps through a short introduction.','accounts-cards',{placement:'home-scene',designRationale:{title:'A familiar place to begin',copy:'I placed Turbo Hub alongside the accounts Arun already manages, giving him a familiar starting point. A short auto-playing introduction then covers shared access, boundaries and everyday payments before setup.'},sequence:[{id:'accounts-cards',title:'Entry point · Accounts & Cards',route:'accounts-cards',copy:'Arun discovers Turbo Hub beneath his linked cards.'},{id:'hub-introduction',title:'Onboarding · Turbo Hub introduction',route:'onboarding',copy:'An auto-playing introduction covers shared family access, spending boundaries and everyday payments.'}]}),
      flow('create-flow','father','Set up the family Hub','Arun is ready to set things up, so he names the Hub “The Sharma’s” and chooses which of the accounts he already has on PayZapp will fund it.',
        {title:'Two decisions, nothing more',copy:'I kept creation to the two choices only Arun can make: the Hub’s name and which of his existing PayZapp accounts funds it. Members and everything else wait until the Hub exists, so he finishes with a clear next step instead of a long form.'},
        [screen('hub-setup','Name it and choose an account','create-hub?step=details','He names it “The Sharma’s” and selects the credit account that will fund it.',{stepCopy:'Arun names the Hub and picks the PayZapp account that funds it.'}),
         screen('hub-created','Ready to invite the family','hub-dashboard?state=new','The Hub is created. Arun can set its monthly limit and start inviting the family.',{stepCopy:'The new Hub is ready, with its monthly limit and family still to set up.'})],{presentation:'loop',playback:'scripted'}),
      flow('kavya-invite-flow','father','Arun invites Kavya','From the Hub’s Members tab, Arun invites his wife, Kavya, to manage the Hub with him as a co-manager and sets up the payment methods she will use. Once the invitation is sent, she shows on Members as yet to join.',
        {title:'Roles before money',copy:'Inviting Kavya and deciding what she can do happen together, so access is never sent without thought. The Manager toggle is the one choice that changes responsibility, and payment methods with their fees follow right after it.'},
        [screen('members-owner','Start from Members','hub-dashboard?tab=Members&roster=owner','The new Hub’s Members tab lists only Arun, with Add ready for inviting the family.',{stepCopy:'Arun taps Add to invite a co-manager.'}),
         screen('add-member','Invite Kavya','add-member','Arun adds Kavya and enables Manager role so they can share responsibility.',{avatarUser:'kavya',stepCopy:'He adds Kavya’s details and enables Manager role.'}),
         screen('member-payment-methods','Choose her payment methods','add-member?step=payments','Before sending Kavya’s invitation, the family chooses her payment methods and reviews their fees.',{actor:'mother',stepCopy:'He chooses Digital Card and UPI for Kavya.'}),
         screen('invite-sent','Invitation sent','invite-sent?name=Kavya%20Sharma','A success screen confirms the invitation went to Kavya over WhatsApp.',{stepCopy:'The confirmation shows that her invitation was sent.'}),
         screen('hub-members','Back on Members','hub-dashboard?tab=Members','Back on Members, Kavya appears with the note that she is yet to join the Hub.',{stepCopy:'Kavya now appears in Members as yet to join.'})],{presentation:'loop',playback:'invite',loopInterval:4200}),
      flow('children-invite-flow','father','Arun invites the children','Arun invites Rohan for his college expenses and Neha with a monthly allowance, setting each limit as he goes. Back on Members, both show as yet to join.',
        {title:'Limits set at the moment of inviting',copy:'Rohan joins as a member without manager rights, and Neha’s monthly allowance is set straight after, so each child’s boundary exists before their first payment rather than being added later.'},
        [screen('members-parents','Members before the children','hub-dashboard?tab=Members&roster=invited','Arun is on the Hub and Kavya’s invitation is out before the children are invited.'),
         screen('invite-son','Invite Rohan','add-member','Arun gives Rohan member access for college expenses, without enabling Manager role.',{member:'son',avatarUser:'rohan'}),
         screen('spending-limit','Set the allowance and send the invite','spending-limit','Arun sets Neha’s monthly limit to ₹5,000, then sends the invitation.',{proposed:true,actor:'daughter'}),
         screen('children-invite-sent','Invitation sent','invite-sent?name=Neha%20Sharma','The animated confirmation marks the invitation as sent. Arun will be notified.',{actor:'daughter',confirmationHeading:'Invitation sent',confirmationCopy:'Arun will be notified.'}),
         screen('members-children-invited','Invitations sent','hub-dashboard?tab=Members&roster=all-invited','Members now lists Neha and Rohan as yet to join, each with their limit already set.')],{presentation:'loop',playback:'scripted'})
    ]},
    {id:'children',headerless:true,title:'The children join',intro:'Rohan and Neha both join.',scenes:[
      flow('whatsapp-invite-flow','daughter','Neha joins from a WhatsApp invite','Neha has never used PayZapp. Arun’s invite reaches her on WhatsApp, the link takes her to the Play Store, and the moment she opens PayZapp it welcomes her into The Sharma’s Family Hub. One number check later, she’s in. Rohan joins the same way.',
        {title:'PayZapp does the onboarding',copy:'A new user would normally face a generic app intro and a long sign-up before reaching anything family-related. Here the invite carries the context: PayZapp’s first launch opens on the Hub invitation, shows who invited her and exactly what Arun has set up, and needs only the OTP for the number he already entered. Neha goes from a WhatsApp message to a member of the Hub in four taps.'},
        [screen('invite-notification','Neha’s lock screen','payment-notification?kind=invite','A WhatsApp notification from HDFC Bank tells Neha that Arun has invited her to the family Hub.'),
         screen('invitation','The invitation on WhatsApp','invitation','The chat shows the family Hub preview and a link to join on PayZapp.'),
         screen('play-store','Install PayZapp','play-store','New to PayZapp, Neha installs it from the Play Store, then taps Open.',{proposed:true}),
         screen('hub-welcome','Welcomed into the Hub','hub-welcome','PayZapp opens straight on the invitation: who invited her, who’s in the Hub, and the UPI, card and ₹5,000 limit Arun has set up.',{proposed:true}),
         screen('verify-mobile','Confirm her number','verify-mobile','The only account step: a code sent to the number Arun invited, filled in from SMS.',{proposed:true}),
         screen('hub-joined','She’s in','hub-joined','Neha has joined. Two short steps remain before she can pay.',{proposed:true})]),
      flow('member-activation-flow','daughter','Neha activates her payment methods','Neha’s profile shows what still needs her: UPI waits on a PAN check and a UPI PIN, and her card needs a delivery address. Each pending method is a row she can tap, and both are done in a few minutes.',
        {title:'Show what’s pending, where it lives',copy:'Activation isn’t a wizard bolted onto sign-up. Each payment method carries its own status on Neha’s profile, so she can make UPI usable now and add the card address whenever she likes. PAN and the UPI PIN are asked once, in two short steps, because they’re what UPI needs and nothing more.'},
        [screen('neha-profile','Two methods to activate','member-profile?member=neha','UPI asks for a PAN check and the card asks for a delivery address.',{proposed:true}),
         screen('verify-pan','Verify PAN','verify-pan','Step 1 of 2 for UPI: PAN, name and date of birth, with consent to check it.',{proposed:true}),
         screen('upi-pin','Set a UPI PIN','upi-pin','Step 2 of 2: a 4-digit PIN she’ll use to approve every UPI payment.',{proposed:true}),
         screen('neha-upi-active','UPI is active','member-profile?member=neha&upi=active&done=upi','Back on her profile, UPI is active; only the card address remains.',{proposed:true}),
         screen('neha-delivery','Add a delivery address','delivery-details?member=neha&upi=active','Neha adds her address on the same short form Kavya used.'),
         screen('neha-delivery-confirmed','Card on its way','delivery-confirmed?member=neha&upi=active','The card’s delivery date, and a reminder she can pay virtually until then.'),
         screen('neha-ready','Ready to pay','member-profile?member=neha&upi=active&saved=true','Both methods are set up. Neha can start paying from the Hub.',{proposed:true})]),
      flow('request-flow','daughter','Neha requests to pay','Neha wants to pay ₹2,500 at Nykaa, so she scans the store’s QR code, reviews the payment and sends it to her parents for approval.',
        {title:'Asking shouldn’t feel like failing',copy:'Approval is framed as a normal step, not an error. Neha sees the merchant, amount and Hub before she asks, and the pending screen tells her exactly who can approve and how long they have, so waiting at the counter feels predictable.'},
        [screen('scan-qr','Neha starts a payment','scan-qr','At Nykaa, Neha opens Scan & Pay to begin her purchase.'),
         screen('payment-review','Review the ₹2,500 payment','payment-review?amount=2500','Neha checks the merchant, amount and family Hub account before requesting approval.'),
         screen('request-pending','Wait for a manager','request-pending?amount=2500','Neha sees who can approve her request and how long they have to respond.')],{presentation:'loop',playback:'scripted'}),
      flow('approve-flow','father','Arun approves','Arun gets a notification about Neha’s request, so he opens it, checks the amount and the merchant, and swipes to authorise.',
        {title:'Enough to decide, one step to act',copy:'The notification already says who, where and how much, and opens straight into the request. The authorise screen keeps the amount and merchant up front with the time left beside the swipe, so Arun can act quickly without losing sight of what he is approving.'},
        [screen('payment-notification','Arun gets the request','payment-notification?amount=2500','The notification tells Arun who is paying, where, and how much.'),
         screen('payment-authorize','Approve or decline','payment-authorize?amount=2500','Arun reviews Neha’s ₹2,500 request and decides whether to authorize it.'),
         screen('authorization-confirmed','Approval confirmed','authorization-confirmed?amount=2500','Arun’s part is complete. Neha’s payment can now proceed.')]),
      flow('complete-flow','daughter','Neha’s payment goes through','Neha is still at the counter when Arun approves, so her payment goes through straight away and she gets a receipt.',
        {title:'Close the loop on both phones',copy:'Neha learns about the approval the moment it happens, without refreshing or asking. The receipt names the Hub as the source, so the purchase shows up the same way in her history and in the family’s spending.'},
        [screen('payment-processing','The payment is processing','payment-processing?amount=2500','Neha sees that her approved payment is underway.'),
         screen('payment-receipt','Payment complete','payment-receipt?amount=2500','The receipt confirms Neha’s ₹2,500 payment to Nykaa and records its transaction details.')])
    ]},
    {id:'tracking',headerless:true,title:'Keeping track together',intro:'Both parents can see who is in the Hub and where the money goes, without auditing every purchase.',scenes:[
      flow('tracking-flow','mother','Arun and Kavya keep an eye on spending','Arun and Kavya both want to keep track of how the family is spending, so either of them can open the Hub to see who has joined, check recent transactions against the monthly total and explore where the money goes.',
        {title:'Oversight without surveillance',copy:'Members, spends and analytics are tabs of one Hub, with totals first and detail a tap away, so either parent can glance at the family’s spending without auditing every purchase. The Hubs list keeps the family Hub separate from any other spaces they manage.'},
        [screen('members-family','Who has joined','hub-dashboard?tab=Members&roster=family','The Members view shows the whole family with what each person has spent against their limit.'),
         screen('hub-dashboard','Recent spending','hub-dashboard?tab=Spends','Recent transactions sit alongside the family’s monthly spending total.'),
         screen('hub-analytics','Where the money goes','hub-dashboard?tab=Analytics','Analytics shows who is spending, on what, and through which payment methods.',{actor:'father'}),
         screen('hubs','All Hubs','hubs','The family Hub is easy to tell apart from other spaces a parent manages or belongs to.',{actor:'father'})],{connected:false})
    ]},
    {id:'co-manager',title:'Kavya joins as co-manager',intro:'Arun and Kavya run the household together, so Kavya manages the Hub alongside him, with her own card and payment methods.',scenes:[
flow('card-flow','mother','Kavya finishes her card setup','Kavya wants her physical card, so she checks her profile, sees her UPI access is already active and adds a delivery address for the card.',
        {title:'Show what works now',copy:'Kavya’s UPI access is live immediately, so her profile says so before asking for anything. The physical card is the one thing still pending, and its delivery form asks only for what the courier needs.'},
        [screen('member-profile','Check Kavya’s payment access','member-profile','Kavya sees her limit and active UPI access. Her physical card still needs delivery details.'),
         screen('delivery-details','Add a delivery address','delivery-details','Kavya enters her address and contact details to continue setting up her physical card.'),
         screen('delivery-confirmed','Card on its way','delivery-confirmed','A short celebration confirms the address, when the card will arrive, and that she can pay with it virtually until then.'),
         screen('address-saved','Back on her profile','member-profile?saved=true','The card no longer asks for details; both payment methods are ready.')])
    ]},
    {id:'tag',hidden:true,title:'An optional extension for the family',intro:'The family can optionally add a Pixel Tag for payment or tracking.',scenes:[
      flow('tag-flow','father','Add a Pixel Tag','Arun wants to keep track of the house keys, so he links a Pixel Tag he already owns, sees it join the Hub and sets a boundary around home.',
        {title:'Optional, and it says so',copy:'Pixel Tags extend the Hub but are never required, so they appear after creation as an invitation to explore. Linking an existing tag is a scan, and geofencing starts from sensible defaults: home, a 500-metre radius and a clear permission ask.'},
        [screen('pixel-tag','Explore Pixel Tags','pixel-tag','Arun compares the payment and tracking options, or chooses to link a tag he already owns.'),
         screen('tag-scanner','Scan an existing tag','tag-scanner','Arun finds the QR code on his tag and begins linking it.'),
         screen('tag-added','The tag joins the Hub','tag-added','Card Keys appears alongside the family, with a prompt to finish its geofence setup.',{actor:'mother'}),
         screen('geofence-setup','Set a location boundary','geofence-setup','Arun chooses the family home, a 500-metre radius, and location permission for the tag.',{proposed:true})])
    ]}
  ];
  const scenes=chapters.flatMap(chapter=>chapter.scenes.flatMap(item=>item.sequence?item.sequence.map(screen=>({...item,...screen,sequence:undefined})):[item]));
  // Family name shown on the home illustration; x/y are % of the illustration for its top-left corner.
  const family = {name:'The Sharma family',label:{x:6,y:8}};
  const story={cast,family,chapters,scenes};
  if(typeof module==='object'&&module.exports)module.exports=story;
  else root.TurboFamilyStory=story;
})(typeof window==='undefined'?globalThis:window);
