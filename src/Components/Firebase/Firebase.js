import React from "react"
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import { Redirect } from "react-router-dom";

const firebaseConfig = {
    apiKey: "AIzaSyAR3ULqMeUMpu7BOtRJHDmBKHC2xkEix8U",
    authDomain: "react-firebase-todo-74bcc.firebaseapp.com",
    databaseURL: "https://react-firebase-todo-74bcc.firebaseio.com",
    projectId: "react-firebase-todo-74bcc",
    storageBucket: "react-firebase-todo-74bcc.appspot.com",
    messagingSenderId: "605605672910",
    appId: "1:605605672910:web:cff365599cdd70522b9d9f"
};

firebase.initializeApp(firebaseConfig)

export var auth = firebase.auth()
export var todoCollection = firebase.firestore().collection("todo")

export const createUser = (email, password) =>{
    auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
        firebase.auth().onAuthStateChanged(function(user) {
            user.sendEmailVerification();
            const userId = user.uid;
            firebase.firestore().collection("todo").doc(userId).set({
                "todo":[]
            })
        });
        window.location = "/"
    })
    .catch(err => {
        window.alert(err.message)
    })
}

export const signIn = (email, password) =>{
    auth.signInWithEmailAndPassword(email, password)
    .then(user => {
        <Redirect to="/" />
    })
    .catch(err => {
        window.alert(err.message)
    })
}

export const signInWithGoogle = () =>{
    var provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
    .then(user => {
            todoCollection.get()
            .then(data => {
                firebase.auth().onAuthStateChanged(function(user) {
                    const userId = user.uid;
                    var idFound = data.docs.filter(d => {
                        return d.id === userId
                    })
                    if(!idFound){
                        todoCollection.doc(userId).set({
                            "todo":[]
                        })
                    }
                })
            });
        window.location = "/"
    })
    .catch(err => {
        window.alert(err.message)
    })
}

export const signInWithFacebook = () =>{
    var provider = new firebase.auth.FacebookAuthProvider()
    auth.signInWithPopup(provider)
    .then(user => {
            todoCollection.get()
            .then(data => {
                firebase.auth().onAuthStateChanged(function(user) {
                    const userId = user.uid;
                    var idFound = data.docs.filter(d => {
                        return d.id === userId
                    })
                    if(!idFound){
                        todoCollection.doc(userId).set({
                            "todo":[]
                        })
                    }
                })
            });
        window.location = "/"
    })
    .catch(err => {
        window.alert(err.message)
    })
}

export const signOut = () =>{
    auth.signOut()
    .then(()=>{
        return <Redirect to="/login" />
    })
    .catch((err)=>{
        window.alert(err.message)
    })
}

export default firebase