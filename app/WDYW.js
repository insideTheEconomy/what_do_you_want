// JavaScript Document

var thingsToDrop = [], moveinTiming = [], jsonObj = {}, chosenAge = '', visibiltyAccess=false, ageCount=1, inactivityTimer, attractLooper, timerCallback, inactivityCount=0, countDown=0, inactivityAlertVisible = false, inactivityTolerance= 30;
var agegroupArray=['teenager', 'yadult', 'adult', 'senior'];

function initializeMe() {
	$( document ).ready(function() {
		// Handler for .ready() called.
		//alert("fun");
	
		$.getJSON('wdyw.json?t='+ new Date().getTime(),{ format: "json" })
		.fail(function() { console.log( "error" ); })
		.done(function(data){
			jsonObj = data;
			jsObj = $.parseJSON( jsonObj );
			console.log("Success");
			//console.log(jsonObj[0].ageGroup[1].choiceOptA);
			$('#title').html(jsonObj[0].title);
			$('#opChoiceA').html(jsonObj[0].opChoiceA);
			$('#opChoiceB').html(jsonObj[0].opChoiceB);
			$('#opCost').html(jsonObj[0].opCost);
			$('#seeHowItWorks').html(jsonObj[0].seeHowItWorks);
			$('#chooseAgeGroup').html(jsonObj[0].chooseAgeGroup);
			$('#teenager h3').html(jsonObj[0].ageGroup[0].buttonText);
			$('#youngadult h3').html(jsonObj[0].ageGroup[1].buttonText);
			$('#adult h3').html(jsonObj[0].ageGroup[2].buttonText);
			$('#senior h3').html(jsonObj[0].ageGroup[3].buttonText);
		})    
		//activateInactivityTimer();
//		restartIntro();
		setTimeout(function(){ 
			$("body").mousemove( function(){resetInactivityTimer()} );
			$("body").click( function(){resetInactivityTimer()} );
		},500);
			$('#visualaccess').click( function(){ toggleVisibility()} );
		launchAttract();
	});	
}
function toggleVisibility() {
	if (!visibiltyAccess) {
		$('#outerContainer').addClass('makeNegative');
		visibiltyAccess=true;
	} else {
		$('#outerContainer').removeClass('makeNegative');
		visibiltyAccess=false;
	}
}
function activateAgeGroupButtons() {
	$("#teenager").click(function(){
		deactivateAgeGroupButtons();
		pauseAmbience();
		chosenAge = '#teenager';
		fillSection(0);
		$("#teenager").removeClass('moveIn').addClass('screen2');
		setTimeout(function(){ 
			$("#opCost2").removeClass('screen3'); 
			dropThese(['#qmark', '#title','#youngadult', '#adult', '#senior', '#opChoiceA', '#opChoiceB', '#opCost', '#seeHowItWorks', '#chooseAgeGroup']);
			moveinThese(['#clock','#opCost2','#imagine', '#imagineA', '#imagineB', '#chooseWhich', '#choiceOptA', '#choiceOptB']);
		}, 1000);
		setTimeout(function(){ 
			resumeAmbience();
			$('#qmark').removeClass().addClass('screen2');
			activateChoiceButtonsOptAoptB();			
		},3000);
	});
	
	$("#youngadult").click(function(){
		deactivateAgeGroupButtons();
		pauseAmbience();
		chosenAge = '#youngadult';
		fillSection(1);
		$("#youngadult").removeClass('moveIn').addClass('screen2');
		
		setTimeout(function(){ 
			$("#opCost2").removeClass('screen3'); 
			dropThese(['#qmark', '#title','#teenager', '#adult', '#senior', '#opChoiceA', '#opChoiceB', '#opCost', '#seeHowItWorks', '#chooseAgeGroup']);
			moveinThese(['#clock','#opCost2','#imagine', '#imagineA', '#imagineB', '#chooseWhich', '#choiceOptA', '#choiceOptB']);
		}, 1000);
		setTimeout(function(){ 
			resumeAmbience();
			$('#qmark').removeClass().addClass('screen2');
			activateChoiceButtonsOptAoptB();			
		},3000);
	});
	
	$("#adult").click(function(){
		deactivateAgeGroupButtons();
		pauseAmbience();
		chosenAge = '#adult';
		fillSection(2);
		$("#adult").removeClass('moveIn').addClass('screen2');
		
		setTimeout(function(){ 
			$("#opCost2").removeClass('screen3'); 
			dropThese(['#qmark', '#title','#youngadult', '#teenager', '#senior', '#opChoiceA', '#opChoiceB', '#opCost', '#seeHowItWorks', '#chooseAgeGroup']);
			moveinThese(['#clock','#opCost2','#imagine', '#imagineA', '#imagineB', '#chooseWhich', '#choiceOptA', '#choiceOptB']);
		}, 1000);
		setTimeout(function(){ 
			resumeAmbience();
			$('#qmark').removeClass().addClass('screen2');
			activateChoiceButtonsOptAoptB();			
		},3000);
	});
	
	$("#senior").click(function(){
		deactivateAgeGroupButtons();
		pauseAmbience();
		chosenAge = '#senior';
		fillSection(3);
		$("#senior").removeClass('moveIn').addClass('screen2');
		
		setTimeout(function(){ 
			$("#opCost2").removeClass('screen3'); 
			dropThese(['#qmark', '#title','#youngadult', '#adult', '#teenager', '#opChoiceA', '#opChoiceB', '#opCost', '#seeHowItWorks', '#chooseAgeGroup']);
			moveinThese(['#clock','#opCost2','#imagine', '#imagineA', '#imagineB', '#chooseWhich', '#choiceOptA', '#choiceOptB']);
		}, 1000);
		setTimeout(function(){ 
			resumeAmbience();
			$('#qmark').removeClass().addClass('screen2');
			activateChoiceButtonsOptAoptB();			
		},3000);
	});
	
}

function deactivateAgeGroupButtons() {
	$('#teenager').unbind('click');
	$('#youngadult').unbind('click');
	$('#adult').unbind('click');
	$('#senior').unbind('click');
}
function activateChoiceButtonsOptAoptB() {
	$("#choiceOptA").click(function(){
		$(chosenAge).addClass('screen3');
		$("#choiceOptA").removeClass('moveIn').css({'webkit-transition':'all 1.3s ease .75s' }).addClass('screen3');
		$("#opCost2").removeClass('moveIn').addClass('screen3');
		$("#choiceOptB").addClass('blurBack');
		$("#opCostFlipContainer").removeClass();
		setTimeout(function(){ $("#clock").addClass('screen3')},500);
		pauseAmbience();
		setTimeout(function(){
			resumeAmbience();
			deactivateChoiceButtonsOptAoptB();
			activateNextButtonOptAoptB();
		},3000);
		dropThese(['#imagine', '#imagineA', '#imagineB', '#chooseWhich']);
		moveinThese(['#opCostFlipContainer','#opCostHeadA','#opCostSubheadA', '#opCostTextA', '#nextButton']);
	});
	$("#choiceOptB").click(function(){
		$(chosenAge).addClass('screen3');
		$("#choiceOptB").removeClass('moveIn').css({'webkit-transition':'all 1.3s ease .75s' }).addClass('screen3');
		$("#opCost2").removeClass('moveIn').addClass('screen3');
		$("#choiceOptA").addClass('blurBack');
		$("#opCostFlipContainer").removeClass();

		setTimeout(function(){ $("#clock").addClass('screen3')},500);
		pauseAmbience();
		setTimeout(function(){
			resumeAmbience();
			deactivateChoiceButtonsOptAoptB();
			activateNextButtonOptAoptB();
		},3000);
		dropThese(['#imagine', '#imagineA', '#imagineB', '#chooseWhich']);
		moveinThese(['#opCostFlipContainer','#opCostHeadB','#opCostSubheadB', '#opCostTextB', '#nextButton']);
	});

}
function deactivateChoiceButtonsOptAoptB() {
	$('#choiceOptA').unbind('click');
	$('#choiceOptB').unbind('click');
}

function activateNextButtonOptAoptB() { 
	$("#nextButton").click(function(){
		$(chosenAge).removeClass('screen3');
		$("#chooseWhich").removeClass('drop', 'moveIn');	
		$("#opCost2").removeClass('screen3');

		setTimeout(function(){ $("#clock").removeClass('screen3')},200);
		pauseAmbience();
		setTimeout(function(){
			resumeAmbience();
			deactivateNextButton();
			activateChoiceButtonsOptCoptD();
			$("#opCostFlipContainer").addClass('stopped');
		},3000);
		$("#choiceOptA").removeAttr( 'style' ).removeClass('screen3');
		$("#choiceOptB").removeAttr( 'style' ).removeClass('screen3');
		dropThese(['#moneyContainer', '#opCostHeadA','#opCostFlipContainer','#opCostHeadB','#opCostSubheadA','#opCostSubheadB', '#opCostTextA', '#opCostTextB', '#nextButton', '#choiceOptA', '#choiceOptB' ]);
		moveinThese(['#balance', '#opCost2','#timeToDecide', '#chooseCorD', '#chooseWhich', '#choiceOptC', '#choiceOptD']);
	});
}
function deactivateNextButton() {
	$('#nextButton').unbind('click').removeClass('moveIn drop');
}

function activateChoiceButtonsOptCoptD() { 
	$("#choiceOptC").click(function(){
		$("#opCost2").removeClass('moveIn').addClass('screen3');
		$(chosenAge).addClass('screen3');	
		$("#choiceOptC").removeClass('moveIn').css({'webkit-transition':'all 1.3s ease .75s' }).addClass('screen3');
		$("#choiceOptD").addClass('blurBack');
		$("#opCostFlipContainer").removeClass();
		setTimeout(function(){ $("#clock").addClass('screen3')},500);
		$('#qmark').removeClass().addClass('screen3');
		pauseAmbience();
		setTimeout(function(){
			resumeAmbience();
			deactivateChoiceButtonsOptCoptD();
			activateNextButtonOptCoptD();
		},3000);
		$("#chooseWhich").removeClass('drop', 'moveIn');	
		dropThese(['#balance','#timeToDecide', '#chooseCorD', '#chooseWhich' ]);
		thingsToDisplay = ['#opCostFlipContainer','#opCostHeadC','#opCostSubheadC', '#opCostTextC', '#nextButton'];
		moveinThese(thingsToDisplay);
		thingsToDisplay.push('#choiceOptC','#choiceOptD' )

	});
	$("#choiceOptD").click(function(){
		$("#opCost2").removeClass('moveIn').addClass('screen3');
		$(chosenAge).addClass('screen3');	
		$("#choiceOptC").addClass('blurBack');
		$("#choiceOptD").removeClass('moveIn').css({'webkit-transition':'all 1.3s ease .75s' }).addClass('screen3');
		$("#opCostFlipContainer").removeClass();
		setTimeout(function(){ $("#clock").addClass('screen3')},500);
		$('#qmark').removeClass().addClass('screen3');
		pauseAmbience();	
		setTimeout(function(){
			resumeAmbience();	
			deactivateChoiceButtonsOptCoptD();
			activateNextButtonOptCoptD();
		},3000);
		$("#chooseWhich").removeClass('drop', 'moveIn');	
		dropThese(['#balance','#timeToDecide', '#chooseCorD', '#chooseWhich']);
		thingsToDisplay = ['#opCostFlipContainer','#opCostHeadD','#opCostSubheadD', '#opCostTextD', '#nextButton'];
		moveinThese(thingsToDisplay);
		thingsToDisplay.push('#choiceOptC','#choiceOptD')
	});
}
function deactivateChoiceButtonsOptCoptD() {
	$('#choiceOptC').unbind('click');
	$('#choiceOptD').unbind('click');
}

function activateNextButtonOptCoptD() { 
	$("#nextButton").click(function(){
		pauseAmbience();	
		$("#opCost2").removeClass('screen3');
		setTimeout(function(){
			resumeAmbience();	
			deactivateNextButton();
			activateRestartButton();
			$("#opCostFlipContainer").addClass('stopped');
			
		},3000);
		dropThese(thingsToDisplay);
		thingsToDisplay = ['#opCostHelp', '#opCostUnderstandA', '#opCostUnderstandB', '#opWhenever', '#finalConsiderations', '#restartButton']
		moveinThese(thingsToDisplay);
		thingsToDisplay.push(chosenAge, '#clock', '#moneyContainer', '#qmark');
	});
}


function activateRestartButton() { 
	$("#restartButton").click(function(){
		$(chosenAge).removeClass('screen3');
		$("#chooseWhich").removeClass('drop moveIn');		
		setTimeout(function(){
			cleanupClasses();
			deactivateRestartButton();
			restartIntro();
		},3000);
		dropThese(thingsToDisplay);		
	});
}

function deactivateRestartButton() { $('#restartButton').unbind('click').removeClass('moveIn drop');  }

function fillSection( sectionId ) {
	var iD = sectionId;
	$('#sectionSet').removeClass();
	$('#sectionSet').addClass(jsonObj[0].ageGroup[iD].sectionSet); 
	$('#imagineA').html(jsonObj[0].ageGroup[iD].imagineA);
	$('#imagineB').html(jsonObj[0].ageGroup[iD].imagineB);
	$('#choiceOptA').html(jsonObj[0].ageGroup[iD].choiceOptA);
	$('#choiceOptB').html(jsonObj[0].ageGroup[iD].choiceOptB);
	$('#opCostHeadA').html(jsonObj[0].ageGroup[iD].opCostHeadA);
	$('#opCostSubheadA').html(jsonObj[0].ageGroup[iD].opCostSubheadA);
	$('#opCostTextA').html(jsonObj[0].ageGroup[iD].opCostTextA);
	$('#opCostHeadB').html(jsonObj[0].ageGroup[iD].opCostHeadB);
	$('#opCostSubheadB').html(jsonObj[0].ageGroup[iD].opCostSubheadB);
	$('#opCostTextB').html(jsonObj[0].ageGroup[iD].opCostTextB);
	$('#chooseCorD').html(jsonObj[0].ageGroup[iD].chooseCorD);
	$('#choiceOptC').html(jsonObj[0].ageGroup[iD].choiceOptC);
	$('#choiceOptD').html(jsonObj[0].ageGroup[iD].choiceOptD);
	$('#opCostHeadC').html(jsonObj[0].ageGroup[iD].opCostHeadC);
	$('#opCostSubheadC').html(jsonObj[0].ageGroup[iD].opCostSubheadC);
	$('#opCostTextC').html(jsonObj[0].ageGroup[iD].opCostTextC);
	$('#opCostHeadD').html(jsonObj[0].ageGroup[iD].opCostHeadD);
	$('#opCostSubheadD').html(jsonObj[0].ageGroup[iD].opCostSubheadD);
	$('#opCostTextD').html(jsonObj[0].ageGroup[iD].opCostTextD);
	$('#caseA').html(jsonObj[0].ageGroup[iD].caseA);
	$('#finalA').html(jsonObj[0].ageGroup[iD].finalA);
	$('#caseB').html(jsonObj[0].ageGroup[iD].caseB);
	$('#finalB').html(jsonObj[0].ageGroup[iD].finalB);
}
function activateInactivityTimer() {
	inactivityCount = 0;
	inactivityTimer = setInterval(function(){inactivityAlert()},inactivityTolerance*1000);
	//$("body").mousemove( function(){resetInactivityTimer()} );
}

function secondsCounter() {
	inactivityCount++;
	$("#inactivityAlertBox center").html(inactivityCount);
	if(inactivityTolerance<inactivityCount) inactivityAlert();
}

function inactivityAlert() { 
	$("#inactivityAlertBox").addClass('showMe');
	inactivityAlertVisible = true;
	clearInterval(inactivityTimer);
	setTimeout(function(){ inactivityTimer = setInterval(function(){secondsCountdown()}, 1000); }, 500);
	countDown = 10;
	$("#inactivityAlertBox center").html(countDown);
}

function secondsCountdown() {
if ( countDown-- ) {
			$("#inactivityAlertBox center").html(countDown);
		} else {
			clearInterval(inactivityTimer);
			//	window.location.reload();
			//	 or  these three lines /**/
			$("#inactivityAlertBox").removeClass('showMe'); //
			inactivityAlertVisible = false; //
			launchAttract(); //
		}
}

function resetInactivityTimer() {
	clearInterval(inactivityTimer);
	inactivityTimer = setInterval(function(){inactivityAlert()},inactivityTolerance*1000);
	if (attractIsPlaying) { //  
		attractIsPlaying = false;
		prepareForLaunch();
	} else if ( inactivityAlertVisible ) {
		$("#inactivityAlertBox").removeClass('showMe'); 
		inactivityAlertVisible = false;
	} else {
		timerCallback = secondsCounter;
		inactivityCount=0;
		$("#inactivityAlertBox center").html(inactivityCount);
	}
}

function launchAttract() {
	cleanupClasses();
	attractIsPlaying=true;
	clearInterval(inactivityTimer);
	
	if (visibiltyAccess) {
		visibiltyAccess = false;
		$('#outerContainer').removeClass('makeNegative');
	}
	
	
	ageCount=0;
	$('#attract').removeClass().css({'display':'block' });
	$('#attract').addClass('fadein');
	$('#attractBalance').removeClass();
	
	setTimeout(function(){
		$('#attractBalance').addClass('fadein');
	}, 1000);
	
		$("#iconL1").removeClass().addClass('senior'); 
		$("#iconL2").removeClass().addClass('senior'); 
		$("#iconR1").removeClass().addClass('senior'); 
		$("#iconR2").removeClass().addClass('senior'); 

	setTimeout(function(){
		$("#iconR2").addClass('approachToSwap'); 
		$("#iconL1").addClass('approachToSwap'); 
	}, 2000);


	setTimeout(function(){ 
		playAttractAnim(); 
		attractLooper = setInterval(function(){playAttractAnim()},17000);
	}, 3000);
}
function playAttractAnim() {
	$('#balanceStruct').removeClass().addClass(agegroupArray[ageCount]);
	setTimeout(function(){ $("#titleA").addClass('approach'); },000);
	setTimeout(function(){ $("#titleB").addClass('approach'); },800);
	setTimeout(function(){ $("#titleC").addClass('approach'); },1600);
	setTimeout(function(){ $("#titleD").addClass('approach'); },2400);	
	setTimeout(function(){ $("#titleQM").addClass('approach'); },3100);
	
	setTimeout(function(){ $("#titleA").removeClass('approach'); },4000);
	setTimeout(function(){ $("#titleB").removeClass('approach'); },5000);
	setTimeout(function(){ $("#titleC").removeClass('approach'); },6000);
	setTimeout(function(){ $("#titleD").removeClass('approach'); },7000);
	setTimeout(function(){ $("#titleQM").removeClass('approach'); },8000);
	
	setTimeout(function(){ $("#iconR1").addClass('approachToSwap'); },5300);
	setTimeout(function(){ $("#iconR2").addClass('pushedSwap'); },5500);
	setTimeout(function(){ $("#iconR2").removeClass().addClass(agegroupArray[ageCount]); $("#balanceStruct").addClass('tilt'); },6500);
	setTimeout(function(){ $("#iconL2").addClass('approachToSwap'); },8300);
	setTimeout(function(){ $("#iconL1").addClass('pushedSwap'); },8500);
	setTimeout(function(){ $("#iconL1").removeClass().addClass(agegroupArray[ageCount]); $("#balanceStruct").removeClass('tilt'); },9500);	
	setTimeout(function(){ $("#iconR2").addClass('approachToSwap'); },11300);
	setTimeout(function(){ $("#iconR1").addClass('pushedSwap'); },11500);
	setTimeout(function(){ $("#iconR1").removeClass().addClass(agegroupArray[ageCount]); $("#balanceStruct").addClass('tilt'); },12500);
	setTimeout(function(){ $("#iconL1").addClass('approachToSwap'); },14300);
	setTimeout(function(){ $("#iconL2").addClass('pushedSwap'); },14500);
	setTimeout(function(){ $("#iconL2").removeClass().addClass(agegroupArray[ageCount]); $("#balanceStruct").removeClass('tilt'); },15500);
	advanceSection();

}
function advanceSection() {
	ageCount++;
	ageCount%=4;
}

function prepareForLaunch() {
	clearInterval(attractLooper);
	$('#attract').addClass('fadeout');
	setTimeout(function(){ restartIntro(); },1000);
}

function restartIntro() {
	$('#attract').css({'display':'none' });
		$("#qmark").addClass('spin');
		setTimeout(function(){ pauseAmbience(); },1000);
		//pauseAmbience();	,,
		moveinTiming = [0, 2.33, 1.33, 1.33, .33, 1.66, .99, .33, .25, .25, .25, .25];
		setTimeout(function(){
			moveinSlow(['#title', '#opChoiceA', '#opChoiceB','#moneyContainer','#opCost' , '#seeHowItWorks', '#chooseAgeGroup' ,'#teenager', '#youngadult', '#adult', '#senior']);
		},100);
		setTimeout(function(){ resumeAmbience(); },11000);
		setTimeout(function(){ activateAgeGroupButtons(); },11000);  //10500)  we need enough delay so that moveinSLow delaye3d call to remove styles is complete.
}

function cleanupClasses(){
	domElements = ['#qmark', '#balance', '#clock', '#moneyContainer', '#money', '#title', '#opChoiceA', '#opChoiceB', '#opCost', '#seeHowItWorks', '#chooseAgeGroup','#teenager', '#youngadult', '#adult', '#senior', '#opCost2', '#imagine', '#imagineA', '#imagineB','#chooseWhich','#choiceOptA', '#choiceOptB', '#opCostHeadA','#opCostFlipContainer','#opCostHeadB','#opCostSubheadA','#opCostSubheadB', '#opCostTextA', '#opCostTextB', '#nextButton','#timeToDecide', '#chooseCorD', '#chooseWhich','#choiceOptC','#choiceOptD','#opCostHeadC','#opCostSubheadC', '#opCostTextC','#opCostHeadD','#opCostSubheadD', '#opCostTextD','#opCostHelp', '#opCostUnderstandA', '#opCostUnderstandB', '#opWhenever', '#finalConsiderations', '#restartButton'];
	var l= domElements.length;
	for (var i = 0; i < l; i++) $(domElements[i]).removeAttr( 'style' ).removeClass();
	$("#qmark").addClass('hideb4anim');
	
}
function dropThese(domElements) {	
	var l= domElements.length;
	for (var i = 0; i < l; i++) $(domElements[i]).css({'webkit-transition':'all .7s ease-in '+Math.random()*.3+'s'}).addClass('drop');
	setTimeout(function(){ for (var i = 0; i < l; i++) $(domElements[i]).removeAttr( 'style' ); },2000);
}
function moveinSlow(domElements) {	
	var l= domElements.length;
	var n=0, t=0;
	for (var i = 0; i < l; i++) $(domElements[i]).css({'webkit-transition':'all 1s ease-out '+(0.3+(t+=moveinTiming[i]))+'s'}).addClass('moveIn');
	//(t=9.05)
	setTimeout(function(){ for (var i = 0; i < l; i++) $(domElements[i]).removeAttr( 'style' ); },t*1000+1200);
}

function moveinThese(domElements) {	
	var l= domElements.length;
	var n=0;
	for (var i = 0; i < l; i++) $(domElements[i]).css({'webkit-transition':'all .7s ease-out '+(1.3+.15*n++)+'s'}).addClass('moveIn');
	setTimeout(function(){ for (var i = 0; i < l; i++) $(domElements[i]).removeAttr( 'style' ); },3000);
}
function pauseAmbience() {
	  $("#money").addClass('paused');
	  //$("#qmark").addClass('paused');
	  $("#innerContainer").addClass('paused');
}

function resumeAmbience() {
	  $('#money').removeClass('paused');
	  //$('#qmark').removeClass('paused');
	  $('#innerContainer').removeClass('paused');
}