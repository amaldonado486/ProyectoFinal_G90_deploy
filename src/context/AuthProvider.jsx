//import React, {  createContext,  useContext,  useEffect,  useState} from "react";
//
//export const AuthContext = createContext();
//
//const appId =
//  typeof __app_id !== "undefined" ? __app_id : "default-app-id";
//const firebaseConfig =
//  typeof __firebase_config !== "undefined"
//    ? JSON.parse(__firebase_config)
//    : {};
//
//let getAuth,
//  initializeApp,
//  signInWithCustomToken,
//  signInAnonymously,
//  onAuthStateChanged,
//  getFirestore;
//
//export const AuthProvider = ({ children }) => {
//  const [user, setUser] = useState(null);
//  const [db, setDb] = useState(null);
//  const [auth, setAuth] = useState(null);
//  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
//
//  useEffect(() => {
//    const loadFirebase = async () => {
//      try {
//        const firebaseAppModule = await import(
//          "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js"
//        );
//        const firebaseAuthModule = await import(
//          "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js"
//        );
//        const firebaseFirestoreModule = await import(
//          "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js"
//        );
//
//        initializeApp = firebaseAppModule.initializeApp;
//        getAuth = firebaseAuthModule.getAuth;
//        signInWithCustomToken = firebaseAuthModule.signInWithCustomToken;
//        signInAnonymously = firebaseAuthModule.signInAnonymously;
//        onAuthStateChanged = firebaseAuthModule.onAuthStateChanged;
//        getFirestore = firebaseFirestoreModule.getFirestore;
//
//        const app = initializeApp(firebaseConfig);
//        const authInstance = getAuth(app);
//        const dbInstance = getFirestore(app);
//        setAuth(authInstance);
//        setDb(dbInstance);
//
//        const authenticate = async () => {
//          const token =
//            typeof __initial_auth_token !== "undefined"
//              ? __initial_auth_token
//              : null;
//          if (token) await signInWithCustomToken(authInstance, token);
//          else await signInAnonymously(authInstance);
//        };
//
//        await authenticate();
//
//        const unsub = onAuthStateChanged(authInstance, (currentUser) => {
//          setUser(currentUser);
//          setIsLoadingAuth(false);
//        });
//
//        return () => unsub();
//      } catch (e) {
//        console.error("Firebase error", e);
//        setIsLoadingAuth(false);
//
//        if (typeof __initial_auth_token === "undefined") {
//          setUser({ uid: "mock-user-123", email: "mock@sazonplanner.cl" });
//        }
//      }
//    };
//
//    loadFirebase();
//  }, []);
//
//  const login = (email) => {
//    setUser({ uid: "test-user-456", email });
//  };
//
//  const logout = () => {
//    if (auth?.signOut) auth.signOut().then(() => setUser(null));
//    else setUser(null);
//  };
//
//  return (
//    <AuthContext.Provider
//      value={{ user, db, auth, isLoadingAuth, login, logout }}
//    >
//      {children}
//    </AuthContext.Provider>
//  );
//};


import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Mock login
    setUser({
      uid: "mock-uid-123",
      email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
