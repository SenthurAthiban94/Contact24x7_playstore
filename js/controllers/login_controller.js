/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var contact_App=angular.module('Contacts_sync',['contact_services']);
    contact_App.controller('Contacts_sync_controller',['$scope','$http','$window','database',function($scope,$http,$window,database){
        $scope.redirect = function(){
          $window.location='home.html';
        };
        $scope.goBack = function (evt) {
            if (evt != null) {
                if (evt.preventDefault) {
                    evt.preventDefault();
                }
            }
        };
        document.addEventListener("backbutton", $scope.goBack, false);
        $scope.userdata={};
 ////////////////////////////////////////////   SIGN UP  ////////////////////////////////////////////////////       
        
        $scope.signup=function(){
            $scope.signuploading=true;
            $scope.submittedsignup=true;
           if(($scope.username) && ($scope.signup_password) && ($scope.signup_email) && ($scope.phonumber))
           {
               $scope.validate=false;
               $http(database.signup($scope.username,$scope.signup_password,$scope.signup_email,$scope.phonumber)).success(function($data){
                if($data.status==1)
                {
                    $scope.userdata.username=$data.username;
                    $scope.userdata.usermail=$data.usermail;
                    $scope.userdata.userid=$data.userid;
                    sessionStorage.userDataObJect=JSON.stringify($scope.userdata);
                    navigator.notification.alert($data.msg);
                    $scope.submittedsignup=false;
                    $scope.signuploading=false;
                    navigator.vibrate(500);
                    $scope.redirect();
                }
                else
                {
                    if($data.status==0)
                    {
                        navigator.vibrate(500);
                        navigator.notification.alert($data.msg);
                        $scope.signuploading=false;
                        $scope.submittedsignup=false;   
                    }
                    else{
                        navigator.notification.alert("Network Error !!");
                        $scope.signuploading=false;
                        $scope.submittedsignup=false;
                    }
                }
               }).error(function(err){
                   navigator.vibrate(1000);
                   if((err=="") || (err=="undefined")){
                       navigator.notification.alert("Check your Internet Connection!!");
                   }
                   else{
                       navigator.notification.alert("Error During Signup Try Again Later");
                   }
                   $scope.submittedsignup=false;
                   $scope.signuploading=false;
               });
           }
           else{
               $scope.validate=true;
               $scope.submittedsignup=false;
               $scope.signuploading=false;
           } 
        };
        $scope.login=function(){
            $scope.loginloading=true;
            $scope.submitted=true;
            if($scope.login_mail){
                $scope.validateemail=false;
                //navigator.notification.alert(database.login($scope.login_mail,$scope.login_password));
                $http(database.login($scope.login_mail,$scope.login_password)).success(function($data){
                    if($data.status==1)
                    {
                        $scope.validate=false;
                        $scope.userdata.username=$data.username;
                        $scope.userdata.usermail=$data.usermail;
                        $scope.userdata.userid=$data.userid;
                        $scope.userdata.contacts=$data.Contacts;
                        sessionStorage.userDataObJect=JSON.stringify($scope.userdata);
                        $scope.submitted=false;
                        $scope.loginloading=false;
                        navigator.vibrate(500);
                        $scope.redirect();
                    }
                    else{
                            if($data.msg=="Mail ID or Password is Incorrect" && $data.status==0)
                            {
                                navigator.vibrate(500);
                                $scope.validate=true;$scope.submitted=false;$scope.loginloading=false;   
                            }
                            else{
                                navigator.notification.alert("Network Error !!");
                                $scope.submitted=false;$scope.loginloading=false;
                            }
                         }
               }).error(function(err){
                   navigator.vibrate(1000);
                   if((err=="") || (err=="undefined")){
                       
                       navigator.notification.alert("Check your Internet Connection!!");
                   }else{
                       navigator.notification.alert("Error During Login Try Again Later");
                   }
                   $scope.loginloading=false;
                   $scope.submitted=false;
               });       
            }else{$scope.validateemail=true;$scope.loginloading=false;$scope.submitted=false;}
        };
        
        if(sessionStorage.userDataObJect){
            $scope.redirect();
        }	    
    }]);

