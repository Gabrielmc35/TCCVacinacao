const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });

 const createNotification = (notification =>
 {
     return admin.firestore().collection('notifications')
     .add(notification)
     .then(doc=> console.log('notification added', doc))
 })

 exports.projectCreated = functions.firestore
 .document('vacinas/{vacinasId}')
 .onCreate(doc => {

   const vacina = doc.data();
   const notification = {
     content: ' Cadastrou Nova Vacina',
     user: `${vacina.nomenclaturaAtual} `,
     time: admin.firestore.FieldValue.serverTimestamp()
   }

   return createNotification(notification);

});

exports.userJoined = functions.auth.user()
  .onCreate(user => {
    
    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        const notification = {
          content: 'Entrou No Sistema',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        };

        return createNotification(notification);

      });
});


exports.teste = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });
