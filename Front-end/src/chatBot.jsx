import ChatBot from "react-simple-chatbot";
import React from "react";
import Logo from "./img/bot-icon-5.png";
import { ThemeProvider } from "styled-components";
import Axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// all available props
const theme = {
  background: "#f5f8fb",
  fontFamily: "cursive",
  headerBgColor: "#0e82af",
  headerFontColor: "#fff",
  headerFontSize: "20px",
  botBubbleColor: "#3fa4a9",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a"
};

const logoStyle = {
  width: "122",
  height: "157px",
  verticalAlign: "middle"
};
const floatSty = {
  position: "absolute",
  right: "70px",
  bottom: "70px"
};
const paperStyle = {
  display: "flex",
  flexWrap: "wrap",
  margin: "20px",
  height: "100px",
  width: "70%",
  background: "rgb(253, 250, 250)",
  color: "#ef3b13",
  fontSize: "36px"
};
const rootStyle = {
 background:'#4abfd2'
}
var bot_current_message=' '

// this is ReactChatBot component. 
export default class ReactChatBot extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { getWeatherData:" ",}
  this.getWeatherStatus= this.getWeatherStatus.bind(this)
     
  } //end of constructor

  //this method is representing weather status it is taking city name as a input.  
getWeatherStatus(value){
  // Make a request for a user with a given ID
  //Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${value}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`)
  Axios.post(`http://localhost:5005/webhooks/rest/webhook`,{message:value})    
  .then(function (response) {
      // handle success
      console.log(response);
      console.log(response);
      console.log("response.text=",response.data[0].text)
      bot_current_message=response.data[0].text //setting the bot response
      console.log("bot axios response=",bot_current_message)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

// this function return the current status of weather 
getWeatherData=()=>{
  console.log("bot response",bot_current_message)

  return bot_current_message
}
  render() {
    return (
      <div style={{backgroundColor: "#FF0000"}}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              Artificial Inteligence ChatBot -POC
            </Typography>
          </Toolbar>
        </AppBar>
        
        <ThemeProvider theme={theme}>
         
          <ChatBot
            recognitionEnable={true}   
            steps={  [
              {
                id: "0",
                message: "I am Diya your digital assistant.How can I help you",
                trigger: "search"
              },
      
              {
                id: "search",
                user: true,
                validator: (value) => {
                this.getWeatherStatus(value)
                return true;
                },
                // waitAction: true,
                // delay : 10,
                trigger: "1"
              },
      
              {
                id: "1",
                message:(this.getWeatherData),
                trigger: "search"
              }
            ]
          }
            floating={true}
            floatingIcon={<img style={logoStyle} src={Logo} />}
            floatingStyle={floatSty}
            botAvatar={Logo}
            enableSmoothScroll={true}
            headerTitle="Robo 2.0"
          />
        </ThemeProvider>
      </div>
    );
  }
}
