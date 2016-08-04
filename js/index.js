var names=[];
var loading;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
//        document.addEventListener('load', this.onDeviceload, false);
//        document.addEventListener('offline', this.onDeviceoffline, false);
//        document.addEventListener('online', this.onDeviceonline, false);
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", this.onBackKeyDown, false);
    },
//    onDeviceload: function(){
//    },
//    onDeviceoffline: function(){
//        
//    },
//    onDeviceonline: function(){
//        
//    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
       if(window.MobileAccessibility){
            window.MobileAccessibility.usePreferredTextZoom(false);
       }
       angular.bootstrap(document,['Contactshome']);   
    },
    onBackKeyDown: function(e) {
          e.preventDefault();
    }
};

app.initialize();