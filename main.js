var santiMasterFlex = new Vue({
    el: "#app",
    data: {
        active: "index",
        info: [],
        type: [],
        tournament: [],
        team:[]  
    },
    methods: {
        hideNshow: function (id, tournament, team) {
            this.active = id;
            this.tournament = tournament;
            this.team = team;
        },
        getData() {
            fetch('forHonor_data.json')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    santiMasterFlex.info = data;
                });
        },
         login() {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(){
                santiMasterFlex.getPosts()
                santiMasterFlex.hideNshow("chatHTML");//it doesnt take me to chatHTML??
            });
        },
        writeNewPost() {
            let textToSend = document.getElementById("textInput").value; // get the value of an input 
            let message = {
                message: textToSend,
                name: firebase.auth().currentUser.displayName
            }
            firebase.database().ref('forhonor-98295').push(message)
            console.log(message)
            console.log("write");
        }, //ayuda carnalin Rawl
        quit() {
            firebase.auth().signOut().then(function () {
                santiMasterFlex.hideNshow("index");
            }).catch(function (error) {
                // An error happened.
            });
            console.log("log out");
         },
         twoFn() {
            alert("Thank you! You will be contacted by one of our agents!");
            santiMasterFlex.hideNshow("index");
        },
        getPosts() {

            firebase.database().ref('forhonor-98295').on('value', function (data) { // .on is the lisener for the reading of the database
                var posts = document.getElementById("posts");
                posts.innerHTML = ""; // removes content 
        
                var messages = data.val(); // helper to get only the message of the database
        
                for (var key in messages) { // for in () is a special loop for objects 
                    var text = document.createElement("div");
                    var element = messages[key];
                    text.append(element.name+" : ");
                    text.append(element.message);
                    posts.append(text);
                }
            })
            console.log("getting posts");
        }
    },
    created() {
        this.getData();
    }
});
