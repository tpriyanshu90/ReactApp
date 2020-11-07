import React, { Component } from 'react';
import './App.css';
var waterfall = require('async-waterfall');

class App extends Component {

    state = {
        users : []
    }

    componentDidMount() {
        fetch('/users').then(res => res.json())
        .then(users => this.setState({users}))
    }

    render() {
        return (
          <div className="App">
              <Header />
              <Body />
              <ContactForm />
              <Quiz />
          </div>
        );
    }
}

class Header extends Component{
    render() {
        return(
            <div className="mainHeader">
                <a href="#default" className="logo">All Apps</a>
                <div className="header-right">
                    <a className="active" href="#home">Home</a>
                    <a href="#contact">Contact</a>
                    <a href="#about">About</a>
                </div>
            </div>
        );
    }
}

class Body extends Component{
    constructor(props){
        super(props);
        this.changeCity = this.changeCity.bind(this);
    }

    state = {
        myAPi : "AIzaSyBEqL255eFUx0UgRTLtltIamJT52FkoFGs",
        data : {
            results : [
                {
                    "geometry" :
                        {
                            "location" :
                                {
                                    "lat" :0,
                                    "lng":0
                                }
                        }
                }
            ]
        }
    }

    componentDidMount(){
        /*waterfall([
            function(cb){
                console.log("in 1st");
                cb();
            },
            function(cb){
                console.log("in 2nd");
                cb();
            }
        ], function (err, result) {
            // result now equals 'done'
            console.log("in 3rd");
        });*/
    }
    changeCity(){
        var city = document.getElementsByName("cityName")[0].value;
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+city+'&key=AIzaSyBEqL255eFUx0UgRTLtltIamJT52FkoFGs')
            .then(res => res.json())
            .then(data => this.setState({data}));
    }
    render(){
        var Data = this.state.data;
        return(
            <div className="bodyLat">
                <div className="heading">Enter the city for which you want to calculate the latitude and longitude</div>
                <input type="text" name="cityName" placeholder="enter city name" />
                <button onClick={this.changeCity} className="goBtn">Go</button>
                <div>
                    <span className="answer">Latitude : {Data.results[0].geometry.location.lat}</span> <br/>
                    <span className="answer">Longitude : {Data.results[0].geometry.location.lng}</span>
                </div>
            </div>
        );
    }

}

class ContactForm extends Component{

    constructor(props){
        super(props);
        this.submitData = this.submitData.bind(this);
        this.renderStatus = this.renderStatus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }
    state = {
        "msg" : 0,
        "data" :{
            "name" : "",
            "email" : "",
            "sub" : "",
            "msg" : ""
        }
    }
    initialState = {
        "data" :{
            "name" : "",
            "email" : "",
            "sub" : "",
            "msg" : ""
        }
    }
    handleChange = (e) => {
        if(e.target.name=="Name")
            this.setState({
                data: {
                    "name" : e.target.value,
                    "email" : this.state.data.email,
                    "sub" : this.state.data.sub,
                    "msg" : this.state.data.msg
                }});
        else if(e.target.name=="Email")
            this.setState({
                data: {
                    "name" : this.state.data.name,
                    "email" : e.target.value,
                    "sub" : this.state.data.sub,
                    "msg" : this.state.data.msg
                }
            });
        else if(e.target.name=="Subject")
            this.setState({
                data: {
                    "name" : this.state.data.name,
                    "email" : this.state.data.email,
                    "sub" : e.target.value,
                    "msg" : this.state.data.msg
                }
            });
        else if(e.target.name=="Message")
            this.setState({
                data: {
                    "name" : this.state.data.name,
                    "email" : this.state.data.email,
                    "sub" : this.state.data.sub,
                    "msg" : e.target.value
                }
            });
    }

    componentDidMount(){

    }

    submitData(){
        fetch("/submitContactForm?Name="+this.state.data.name+"&Email="+this.state.data.email+"&Subject="+this.state.data.sub+"&Message="+this.state.data.msg)
            .then(res => {
                res.json()
                this.setState({"msg" : res.status,"data" : this.initialState.data})
            })
    }
    changeStatus(){
        this.setState({"msg":0})
    }
    renderStatus(){
        if(this.state.msg==200)
            return <div id = "alertCross" className="alert alert-success alert-dismissible">
                <a className="close" data-dismiss="alert" onClick={this.changeStatus} aria-label="close" title="close">×</a>
                <strong>Success!</strong> We will reach you soon.
            </div>;
        return null;
    }
    render(){
        return(
            <div className="contactForm">
                <div className="container">
                    <div id="contact">
                        <h3>Quick Contact</h3>
                        <h4>Contact us today, and get reply with in 24 hours!</h4>
                        <fieldset>
                            <input placeholder="Your name" type="text"  name="Name" value={this.state.data.name} onChange={this.handleChange} required />
                        </fieldset>
                        <fieldset>
                            <input placeholder="Your Email Address" type="email" name="Email" value={this.state.data.email} onChange={this.handleChange}  required />
                        </fieldset>
                        <fieldset>
                            <input placeholder="Your Subject" type="text" name="Subject" value={this.state.data.sub} onChange={this.handleChange}  required />
                        </fieldset>
                        <fieldset>
                            <textarea placeholder="Type your Message Here...." name="Message" value={this.state.data.msg} onChange={this.handleChange}  required />
                        </fieldset>
                        <fieldset>
                            <button name="submit" type="submit" id="contact-submit" onClick={this.submitData} data-submit="...Sending">Submit</button>
                        </fieldset>
                    </div>
                    {this.renderStatus()}
                </div>
            </div>
        );
    }
}

class Quiz extends Component{

    constructor(props){
        super(props);
        this.state = {
            "questions" : [
                {
                    "ques" : "What is the capital of India?",
                    "ans" : "Delhi",
                    "options" : ["Delhi", "Wellington" , "Capetown"]
                },
                {
                    "ques" : "What is the capital of USA?",
                    "ans" : "Washington",
                    "options" : ["Washington", "Wellington" , "Capetown"]
                },
                {
                    "ques" : "What is the capital of Argentina?",
                    "ans" : "Buino Aires",
                    "options" : ["Washington", "Buino Aires" , "Capetown"]
                },
                {
                    "ques" : "What is the capital of South Africa?",
                    "ans" : "Capetown",
                    "options" : ["Washington", "Wellington" , "Capetown"]
                },
                {
                    "ques" : "What is the capital of New Zealand?",
                    "ans" : "Wellington",
                    "options" : ["Washington", "Wellington" , "Capetown"]
                }

            ],
            "i" : 0,
            "classBtn1" : "optionsBtn",
            "classBtn2" : "optionsBtn",
            "classBtn3" : "optionsBtn",
            "score" : 0
        }
    }

    componentDidMount(){
        //Here all server calls are made
    }

    render(){
        checkAnswer = checkAnswer.bind(this);
        changeI = changeI.bind(this);
        var i = this.state.i;
        var ans = this.state.questions[i].ans;

        function changeI(){
            if(i<this.state.questions.length-1){
                this.setState({i : this.state.i+1,
                    classBtn1 : "optionsBtn",
                    classBtn2 : "optionsBtn",
                    classBtn3 : "optionsBtn" });
            }
            else{
                this.setState({i : 0,
                    classBtn1 : "optionsBtn",
                    classBtn2 : "optionsBtn",
                    classBtn3 : "optionsBtn" })
            }

        }
        function checkAnswer(e){
            if(e.target.name === ans){
                e.target.class = "correctAnswerBtn";
                if(e.target.id ==="btn1")
                    this.setState({classBtn1 : e.target.class , classBtn2 : "optionsBtn", classBtn3 : "optionsBtn", score : this.state.score+10},() =>setTimeout(changeI,500));
                else if(e.target.id === "btn2")
                    this.setState({classBtn1 : "optionsBtn" , classBtn2 : e.target.class, classBtn3 : "optionsBtn", score : this.state.score+10},() =>setTimeout(changeI,500));
                else if(e.target.id === "btn3")
                    this.setState({classBtn1 : "optionsBtn" , classBtn2 : "optionsBtn", classBtn3 : e.target.class, score : this.state.score+10},() =>setTimeout(changeI,500));
            }
            else{
                e.target.class = "wrongAnswerBtn";
                if(e.target.id ==="btn1")
                    this.setState({classBtn1 : e.target.class , classBtn2 : "optionsBtn", classBtn3 : "optionsBtn", score : this.state.score-5},() =>setTimeout(changeI,500));
                else if(e.target.id === "btn2")
                    this.setState({classBtn1 : "optionsBtn" , classBtn2 : e.target.class, classBtn3 : "optionsBtn", score : this.state.score-5},() =>setTimeout(changeI,500));
                else if(e.target.id === "btn3")
                    this.setState({classBtn1 : "optionsBtn" , classBtn2 : "optionsBtn", classBtn3 : e.target.class, score : this.state.score-5},() =>setTimeout(changeI,500));
            }
        }
        return(
            <section className="quizApp">
                <div className="questionBox">
                    <h3>{this.state.questions[i].ques}</h3>
                            <span>
                                <button id="btn1" className={this.state.classBtn1} name={this.state.questions[i].options[0]}
                                        onClick={checkAnswer} value={this.state.questions[i].options[0]}>
                                    {this.state.questions[i].options[0]}
                                </button>
                                <button id="btn2" className={this.state.classBtn2} name={this.state.questions[i].options[1]}
                                        onClick={checkAnswer} value={this.state.questions[i].options[1]}>
                                    {this.state.questions[i].options[1]}
                                </button>
                                <button id="btn3" className={this.state.classBtn3} name={this.state.questions[i].options[2]}
                                        onClick={checkAnswer} value={this.state.questions[i].options[2]}>
                                    {this.state.questions[i].options[2]}
                                </button>
                            </span>
                    <h4 className="Score">Score : {this.state.score}</h4>
                </div>
            </section>
        );
    }
}

export default App;
