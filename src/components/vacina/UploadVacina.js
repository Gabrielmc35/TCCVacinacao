import React, { Component } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { storage } from '../../config/fbConfig'
import { connect } from 'react-redux'
import firebase from '@firebase/app'
import { enviaVacina } from '../../store/actions/vacinaAuctions'


class UploadVacina extends Component {
    constructor(props) {

        super(props);
        this.state = {
            image: null,
            url: '',
            progress: 0


        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);


    }
    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ image });
        }
    }

    handleDownload = e =>{
        const { image } = this.state;
        const user = firebase.auth().currentUser;

// Create a reference to the file we want to download
var starsRef =     storage.ref(user.uid + '/CartaoVacina').child('CartaoVacina').getDownloadURL().then(url => {
    console.log( storage.ref(user.uid + '/CartaoVacina').child('CartaoVacina').getDownloadURL())
    this.setState({ url });
    console.log(url)
    document.getElementById("download").removeAttribute('hidden');
    document.getElementsByClassName("botaoDownload")[0].style.visibility = "hidden";
// Get the download URL
  // Insert url into an <img> tag to "download"
}).catch(function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/object-not-found':
      // File doesn't exist
      break;

    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;


    case 'storage/unknown':
      // Unknown error occurred, inspect the server response
      break;

  }

});
    }
    handleUpload = () => {
        const { image } = this.state;
        const user = firebase.auth().currentUser;



        console.log(user)
        const uploadTask = storage.ref(user.uid + `/CartaoVacina/${'CartaoVacina'}`).put(image);
        uploadTask.on('state_changed',

            (snapshot) => {
                //progress
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({ progress });

            }, (error) => {
                //error
                console.log(error)
            },
            () => {
                //finished
                storage.ref(user.uid + '/CartaoVacina').child('CartaoVacina').getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({ url });

                    const forestRef = storage.ref(user.uid + `/CartaoVacina/${'CartaoVacina'}`);
                    var metadata = {
                        customMetadata: {
                            'IdUsuario': user.uid,
                            'PrimeiroNome':user.firstName,
                            'Sobrenome':user.lastName
                        }
                    }
                    forestRef.updateMetadata(metadata).then(function (metadata) {
                        console.log(forestRef);
                        // Updated metadata for 'images/forest.jpg' is returned in the Promise
                    }).catch(function (error) {
                        // Uh-oh, an error occurred!
                    });
                })

            });

    }
    render() {
        const style = {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }
        return (
            <div style={style}>
                <progress value={this.state.progress} max="100" />

                <input type="file" onChange={this.handleChange} ></input>
                <button class="button" id="botaoUpload" onClick={this.handleUpload}>Upload</button>

                <br />
                <div class="botaoDownload">
                <img src={this.state.url} alt="Uploaded images" height="300" width="400" hidden id="Imagem" />
            </div>
                <div>
                <a class="waves-effect waves-light btn"  href={this.state.url} hidden    id="download"  onMouseOver={this.handleDownload}><i class="material-icons left">cloud</i>Download

                </a>
                    
                </div>
            </div>




        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {

    return {
           enviaVacina: () => dispatch(enviaVacina())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadVacina)