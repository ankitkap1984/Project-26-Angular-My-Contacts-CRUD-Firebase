// Declare app level module which depends on views, and components
var contactApp=angular.module('contactApp', [
  'ngRoute','firebase'
]);
contactApp.config(['$routeProvider', function($routeProvider) {
	
  $routeProvider
    .when("/",{
    templateUrl:"pages/contact.html",
    controller:"ContactController"
  	})
	 .otherwise({redirectTo: '/'});
}]);


//Controllers
contactApp.controller("ContactController",['$scope','$firebaseArray',function($scope,$firebaseArray){
  console.log("This is contact controller");
	//initialize firebase
  var refData=new Firebase('Put-firebase-database-link-here');
	console.log($scope.refData);
	$scope.contactData=$firebaseArray(refData);
	console.log($scope.contactData);
	
	//add form + button
	$scope.addForm=function(){
		clearFields();
		$scope.addFormShow=true;
	}
	
	//hide form "-" button
	$scope.hideForm=function(){
		$scope.addFormShow=false;
	}
	
	//hide contact
	$scope.hideContact=function(){
		$scope.contactSelected=false;
	}
	
	//edit from hide
	$scope.hideEditForm=function(){
		$scope.editFormShow=false;
	}
	
	//form submit button
	$scope.addFormSubmit=function(){
		console.log("Form submitted");
		//take data from form ng-model values
		if($scope.name){var nameValue=$scope.name} else {var nameValue=null;}
		if($scope.email){var emailValue=$scope.email} else {var emailValue=null;}
		if($scope.company){var companyValue=$scope.company} else {var companyValue=null;}
		if($scope.work_phone){var work_phoneValue=$scope.work_phone} else {var work_phoneValue=null;}
		if($scope.mobile_phone){var mobile_phoneValue=$scope.mobile_phone} else {var mobile_phoneValue=null;}
		if($scope.home_phone){var home_phoneValue=$scope.home_phone} else {var home_phoneValue=null;}
		if($scope.street_address){var street_addressValue=$scope.street_address} else {var street_addressValue=null;}
		if($scope.city){var cityValue=$scope.city} else {var cityValue=null;}
		if($scope.state){var stateValue=$scope.state} else {var stateValue=null;}
		if($scope.zipcode){var zipcodeValue=$scope.zipcode} else {var zipcodeValue=null;}
		
		//build object
		$scope.contactData.$add({
			name:nameValue,
			email:emailValue,
			company:companyValue,
			phone:[{
				work_phone:work_phoneValue,
				mobile_phone:mobile_phoneValue,
				home_phone:home_phoneValue
			}],
			address:[{
				street_address:street_addressValue,
				city:cityValue,
				state:stateValue,
				zipcode:zipcodeValue
			}]
		}).then(function(refData){
		 $scope.id=refData.key();
			console.log("Added contact with id " + $scope.id);
			
			//clear fields
			clearFields();
			
			//hide form after data is added
			$scope.addFormShow=false;
			
			//show message to user
			$scope.msg="Contact Added";
		})
	}
	
	//Show edit form when edit is clicked
	$scope.showEditForm=function(contact){
		$scope.editFormShow=true;
		console.log("contact.id "+contact.key);
		$scope.id=contact.$id;
		console.log("idEditopen "+$scope.id);
		$scope.name=contact.name;
		$scope.email=contact.email;
		$scope.company=contact.company;
		$scope.work_phone=contact.phone[0].work_phone;
		$scope.mobile_phone=contact.phone[0].mobile_phone;
		$scope.home_phone=contact.phone[0].home_phone;
		$scope.street_address=contact.address[0].street_address;
	   	$scope.city=contact.address[0].city;
	   	$scope.state=contact.address[0].state;
	   	$scope.zipcode=	contact.address[0].zipcode;
	}
	
	//Edit form and update firebase
	$scope.editFormSubmit=function(){
		
		//Get id
		var idEdit=$scope.id;
		//Get record 
		console.log("idEdit "+idEdit);
		var record=$scope.contactData.$getRecord(idEdit);
		record.name=$scope.name;
		record.email=$scope.email;
		record.company=$scope.company;
		record.phone[0].work_phone=$scope.work_phone;
		record.phone[0].mobile_phone=$scope.mobile_phone;
		record.phone[0].home_phone=$scope.home_phone;
		record.address[0].street_address=$scope.street_address;
	   	record.address[0].city=$scope.city;
	   	record.address[0].state=$scope.state;
	   	record.address[0].zipcode=	$scope.zipcode;
		
		$scope.contactData.$save(record).then(function(refData){
			$scope.msg="Contact Updated";
		});
		//clear fields
			clearFields();
		$scope.editFormShow=false;
	}
	
	//show contact when clicked on name link
	$scope.showContact=function(contact){
		$scope.contactSelected=true;
		$scope.name=contact.name;
		$scope.email=contact.email;
		$scope.company=contact.company;
		$scope.work_phone=contact.phone[0].work_phone;
		$scope.mobile_phone=contact.phone[0].mobile_phone;
		$scope.home_phone=contact.phone[0].home_phone;
		$scope.street_address=contact.address[0].street_address;
	   	$scope.city=contact.address[0].city;
	   	$scope.state=contact.address[0].state;
	   	$scope.zipcode=	contact.address[0].zipcode;
	}
	
	$scope.removeContact=function(contact){
		$scope.contactData.$remove(contact);
		$scope.msg="Contact Removed";
	}
	// Clear $scope Fields
	function clearFields(){
		console.log('Clearing All Fields...');
		$scope.id = '';
		$scope.name = '';
		$scope.email = '';
		$scope.company = '';
		$scope.mobile_phone = '';
		$scope.home_phone = '';
		$scope.work_phone = '';
		$scope.street_address = '';
		$scope.city = '';
		$scope.state = '';
		$scope.zipcode = '';
	}
}]);
