import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import parseSRT from 'parse-srt';
import $ from 'jquery';
import videoOwners from './videoOwners.list.json';
import attvideoIcon from './attvideoIcon.png';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ClosedCaptionIcon from '@material-ui/icons/ClosedCaption'
import SendIcon from '@material-ui/icons/Send';

var Srt = require('srtjs');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoid: '',
      admin: '',
      launchdate: '',
      windowtitle: '',
      search: '',
      videodescription: '',
      length: '',
      videoOwner: '',
      originpage: '',
      year: '',
      postroll: '',
      skuid: '',
      devicehowto: false,
      topicid: '',
      conversion: false
    };
  }

  populate = () =>{
    let dropdown = $('#owner-dropdown');

      dropdown.empty();

      dropdown.append('<option selected="true" value="custom" >Custom Owner</option>');
      dropdown.prop('selectedIndex', 0);

        for(var i=0; i<videoOwners.rows.length; i++){
          dropdown.append($('<option></option>').attr('value', videoOwners.rows[i].id).text(videoOwners.rows[i].title));
        }
  }


  handleChange = (event) => {
    let item = event.target.id;
    let itemValue = event.target.value;
    this.setState({
      [item]: itemValue
    });
  }

  handleSubmit = (event) => {
    let longString = '<doc>\n\t<field name="id">' + this.state.videoid + '</field>';
    let textboxC = document.getElementById('textboxCaptions').value;

    let dropdown = $('#owner-dropdown').val();
    dropdown = (dropdown == "custom") ? this.state.videoOwner : dropdown;
    let owner = (!this.state.videoOwner ? dropdown : this.state.videoOwner);

    let sku = (!this.state.skuid ? 'N' : this.state.skuid);


    longString = longString + '\n\t<field name="type">video</field>'
    longString = longString + '\n\t<field name="application">all</field>'
    longString = longString + '\n\t<field name="application">live</field>'
    longString = longString + '\n\t<field name="launchDate">'+ this.state.launchdate+'T11:10:00.000Z</field>'
    longString = longString + '\n\t<field name="language">en</field>'
    longString = longString + '\n\t<field name="state">active</field>'
    longString = longString + '\n\t<field name="windowTitle_en"><![CDATA['+ this.state.windowtitle + ']]></field>'
    longString = longString + '\n\t<field name="postRollId">'+ this.state.postroll +'</field>'
    longString = longString + '\n\t<field name="url_videoMobile">//gvpcertvideos.att.com/att-videos/'+ this.state.year + '/'+ this.state.admin+'/'+ this.state.admin+'-mobile.mp4</field>'
    longString = longString + '\n\t<field name="showInSearch">'+this.state.search+'</field>'
    longString = longString + '\n\t<field name="posterImg">'+this.state.admin+'_640x360.jpg</field>'
    longString = longString + '\n\t<field name="thumbTitle_en"><![CDATA[' + this.state.windowtitle + ']]></field>'
    longString = longString + '\n\t<field name="description_en"><![CDATA['+this.state.videodescription+']]></field>'
    longString = longString + '\n\t<field name="thumbWidth">110</field>'
    longString = longString + '\n\t<field name="thumbHeight">62</field>'
    longString = longString + '\n\t<field name="url_thumbIcon_en">//gvpcertvideos.att.com/att-videos/'+this.state.year+'/'+this.state.admin+'/'+this.state.admin+'_110x62.jpg</field>'
    longString = longString + '\n\t<field name="campaignCode"></field>'
    longString = longString + '\n\t<field name="captionData_en"><![CDATA[<?xml version="1.0" encoding="UTF-8"?>'
    longString = longString + '\n<tt xml:lang="en-US" xmlns="http://www.w3.org/ns/ttml" xmlns:tts="http://www.w3.org/ns/ttml#styling">'
    longString = longString + '\n\t<head>'
    longString = longString + '\n\t\t<metadata xmlns:ttm="http://www.w3.org/ns/ttml#metadata">'
    longString = longString + '\n\t\t\t<ttm:title>ClosedCaption.srt</ttm:title>'
    longString = longString + '\n\t\t</metadata>'
    longString = longString + '\n\t\t<styling>'
    longString = longString + '\n\t\t</styling>'
    longString = longString + '\n\t</head>'
    longString = longString + '\n\t<body>'
    longString = longString + '\n\t\t<div>'
    longString = longString + '\n' + textboxC
    longString = longString + '\t\t</div>'
    longString = longString + '\n\t</body>'
    longString = longString + '\n</tt>'
    longString = longString + '\n]]></field>'
    longString = longString + '\n\t\t<field name="videoMeta_en"><![CDATA[<div gvp="'+this.state.videoid+ '"><script type="application/ld+json">{"@context" : "http://schema.org","@type" : "VideoObject","name" : "","description" : "'+this.state.videodescription+'","thumbnailUrl" : "https://gvpcertvideos.att.com/att-videos/'+this.state.year+'/'+this.state.admin+'/'+this.state.admin+'_110x62.jpg","uploadDate" : "'+this.state.launchdate+'","duration" : "'+this.state.length+'","contentUrl" : "https://gvpcertvideos.att.com/att-videos/'+this.state.year+'/'+this.state.admin+'/'+this.state.admin+'.mp4"}</script><video src="https://gvpcertvideos.att.com/att-videos/'+this.state.year+'/'+this.state.admin+'/'+this.state.admin+'.mp4"></video></div>]]></field>'
    longString = longString + '\n\t\t<field name="creator">INSERT CREATOR</field>'
    longString = longString + '\n\t\t<field name="url_videoMain_en">//gvpcertvideos.att.com/att-videos/'+this.state.year+'/'+this.state.admin+'</field>'
    longString = longString + '\n\t\t<field name="videoStartVars">url_videoMobile=//gvpcertvideos.att.com/att-videos/'+this.state.year+'/'+this.state.admin+'/'+this.state.admin+'-mobile.mp4</field>'
    longString = longString + '\n\t\t<field name="videoStartVars">posterImg='+this.state.admin+'_640x360.jpg</field>'
    longString = longString + '\n\t\t<field name="url_learnMorePage_en"><![CDATA[LEARN MORE PAGE DATA HERE]]></field>'
    longString = longString + '\n\t\t<field name="lengthInSeconds">'+this.state.length+'</field>'
    longString = longString + '\n\t\t<field name="liveCategoryId">LIVECATEGORYID</field>'
    longString = longString + '\n\t\t<field name="modifedDate">MODIFIED DATE</field>'
    longString = longString + '\n\t\t<field name="originPage">'+this.state.originpage+'</field>'
    longString = longString + '\n\t\t<field name="owner">'+owner+'</field>'
    longString = longString + '\n\t\t<field name="salesProdCatalogDeviceSkuId">'+ this.state.skuid +'</field>'
    longString = longString + '\n\t\t<field name="grouping">B2B OR B2C OR other GROUPING</field>'
    longString = longString + '\n\t\t<field name="formats">m3u8</field>'
    longString = longString + '\n\t\t<field name="formats">mpd</field>'
    longString = longString + '\n\t\t<field name="formats">mp4</field>'
    longString = longString + '\n\t\t<field name="formats">m3u8</field>'
    longString = longString + '\n\t</doc>'

    let textbox = document.getElementById('textbox');
    textbox.value=longString;

    event.preventDefault();
  }
  uploadDocument2 = () => {
    $(".borderP").hide();
    this.setState({
      conversion: true
    })
    var srtData = document.getElementById("fileChooser2").files[0]
    var srt;
    var reader = new FileReader();
    reader.readAsText(srtData);
    reader.onloadend = function(){
      var srtData = $(reader);
        if(srtData[0].result){
          var jsonSubs = srtData[0].result;
          parseData(jsonSubs);
        }
    }
    function parseData(jsonSubs){
      let data = "";
      let lineCount = 1;
      jsonSubs = jsonSubs.split(/\n/);
      for(var i=0; i< jsonSubs.length; i++){
        if(!jsonSubs[i].search("^[0-9]{2}")){
          jsonSubs[i] = jsonSubs[i].replace(/[ ]*,[ ]*|[ ]+/g, ' --> ');
          data = data + lineCount + "\n" + jsonSubs[i] + "\n";
          lineCount++;
        }else if(jsonSubs[i].search("^[0-9]{2}")){
          if(jsonSubs[i] !== jsonSubs[i+1]){
            data = data + jsonSubs[i] + "\n";
          }
        }
      }
      let modalText = document.getElementById("modalText");
      $("#modalText").val(data);
    }
  }
  uploadDocument3 = () => {
    $(".borderP").hide();
    this.setState({
      conversion: true
    })
    var srtData = document.getElementById("fileChooser3").files[0]
    var srt;
    var reader = new FileReader();
    reader.readAsText(srtData);
    reader.onloadend = function(){
      var srtData = $(reader);
        if(srtData[0].result){
          var jsonSubs = srtData[0].result;
          parseData(jsonSubs);
        }
    }
    function parseData(jsonSubs){
      let data = "";
      let lineCount = 1;
      jsonSubs = jsonSubs.split(/\n/);
      for(var i=0; i< jsonSubs.length; i++){
        if(jsonSubs[i].search("^[0-9]")){
          if(jsonSubs[i].length !== 0){
            data = data + jsonSubs[i] + "\n";
          }
        }
      }
      let modalText = document.getElementById("modalText");
      $("#modalText").val(data);
    }
  }

  uploadDocument = () => {
    var srtData = document.getElementById("fileChooser").files[0]
    var srt;
    let finalCaptions = ''; 
    let beginTimeCaption = '<p begin="';
    let endTimeCaption = ' end="';
    var reader = new FileReader();
        reader.readAsText(srtData);
        reader.onloadend = function(){
          var srtData = $(reader);
            if(srtData[0].result){
              var jsonSubs = parseSRT(srtData[0].result)
              parseData(jsonSubs);
            }
        }
        function parseData(jsonSubs){
          for(var i=0; i< jsonSubs.length; i++){
            var beginTime = new Date(jsonSubs[i].start * 1000).toISOString().substr(11, 11);
            var endTime = new Date(jsonSubs[i].end * 1000).toISOString().substr(11, 11);
            var encodedStr = jsonSubs[i].text.replace(/[\u00A0-\u9999\&]/gim, function(i) {
              return '&#' + i.charCodeAt(0) + ';';
            });
            finalCaptions = finalCaptions + "\t\t\t" + beginTimeCaption + beginTime + '"' + endTimeCaption + endTime + '" >' + encodedStr + "</p>" + "\n";
          }


          let textbox = document.getElementById('textboxCaptions');
          textbox.value = finalCaptions;
        }
  }
  closeModal = () => {
    this.setState({
      conversion: false
    })
    $(".borderP").show();
    
  }



  render() {
    return (
      <div style={{backgroundColor: "#39CCCC"}}>
        <img style={{maxWidth: "100px", zindex: 9999}} src={attvideoIcon}></img>
        {this.state.conversion ? <div id="myModal" className="modal"><div className="modal-content"><span onClick={this.closeModal} id="closeModal" className="close">&times;</span><textarea style={{minWidth: "300px", minHeight: "600px"}} id="modalText"></textarea></div></div> : ""}
        <h2 style={{color: "white"}}>Create New Video:</h2>
        <input id="fileChooser2" type="file" onChange={this.uploadDocument2} style={{ display: 'none' }} >
        </input>
        <label htmlFor="fileChooser2">
            <Button variant="contained" component="span" className="button">
            <ClosedCaptionIcon className="rightIcon" />
              Convert Caption (add numbers to each line)
            </Button>
          </label> 
        <input id="fileChooser3" type="file" onChange={this.uploadDocument3} style={{ display: 'none' }} >
        </input>
        <br />
        <br />
        <br />
        <label htmlFor="fileChooser3">
            <Button variant="contained" component="span" className="button">
            <ClosedCaptionIcon className="rightIcon" />
              Convert Caption (For youtube)
            </Button>
          </label> 
          <br />
        <br />
      <div className="App">
        <header>
          <h3>Upload Caption First: </h3>
            <input id="fileChooser" type="file" onChange={this.uploadDocument} style={{ display: 'none' }} >
            </input>
            <label htmlFor="fileChooser">
            <Button variant="contained" component="span" className="button">
            <CloudUploadIcon className="rightIcon" />
              Upload
            </Button>
          </label> 
        </header>
        <br />
        <div className="borderP">
          <TextField
            id="videoid"
            label="VideoID"
            placeholder="5000676"
            onChange={this.handleChange}
            value={this.state.value}
            margin="normal"
            variant="outlined"
          />
          <br />
          <label>
            Admin Display Name:
            <br />
            <input className="largeInput" placeholder="gvp_eSupport-Linking-Accounts-B2C328479-V2_5000070" type="text" id="admin" value={this.state.value} onChange={this.handleChange} />
            <br />
          </label>
          <br />
          <label>
            Launch Date:
            <input type="date" id="launchdate" value={this.state.value} onChange={this.handleChange} />
            <br />
          </label>
          <label>
            Year:
            <input placeholder="2019" type="text" id="year" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Window Title:
            <br />
            <input className="largeInput" placeholder="Link another account to your user ID" type="text" id="windowtitle" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Video Description:
            <br />
            <input type="text" placeholder="Find out how to link another AT&T account to your ID. Using your ID for more than 1 account doesn’t combine your bills or bundle your services. Sign in once and check your wireless data usage, view your TV plan details, pay your bills, and more." className="largeInput" id="videodescription" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Show in Search:
            <br />
            <input placeholder="true/false" type="text" id="search" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Length:
            <br />
            <input placeholder="mm:ss" type="text" id="length" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Origin Page (url):
            <br />
            <input placeholder="https://www.att.com/" type="text" className="largeInput" id="originpage" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Postroll id:
            <br />
            <input placeholder="pr004" type="text" id="postroll" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <br />
          <Button id="populate" variant="contained" color="primary" onClick={this.populate}> Populate DropDown Data</Button>
          <br />
          <br />
          <label>
            Video Owner:
            <input placeholder="new owner (VIDOW104)" type="text" id="videoOwner" value={this.state.value} onChange={this.handleChange} />
          </label>
          <select id="owner-dropdown" name="owner">
          </select>
          <br />
        </div>
        <br />
        <Button variant="contained" color="primary" onClick={this.handleSubmit} >
          Create!
          <SendIcon className="leftIcon" />
        </Button>
        <br />
        <br />
        <br />
      <div id="devicehowtoinput">
        Device Sku:
        <input placeholder="Device Sku" type="text" id="skuid" value={this.state.value} onChange={this.handleChange} />

        ATG Topic ID:
        <input placeholder="Topic Id" type="text" id="topicid" value={this.state.value} onChange={this.handleChange} />
      </div>


      <h2>Caption Data</h2>
      <textarea id="textboxCaptions" className="textArea" />
      <h2>Full Data</h2>
      <textarea id="textbox" className="textArea" />

      </div>
      </div>
    );
  }
}

export default App;
