const puppeteer= require('puppeteer')
const loginLink= 'https://www.hackerrank.com/auth/login'
const email='pratyushnarain4444@gmail.com'
const pass='plazmaburst'
const codeObj=require('./codes')
let browserOpen=puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport:null
})
let page
browserOpen.then(function(browserObj){
    let browserOpenPromise= browserObj.newPage()
    return browserOpenPromise;
}).then(function(newTab){
page=newTab
let hackerRankOpenPromise=newTab.goto(loginLink)
return hackerRankOpenPromise
}).then(function(){
    let emailEntered=page.type("input[id='input-1']",email, {delay:2})
    return emailEntered
}).then(function(){
    let passwordEntered=page.type("input[type='password']",pass, {delay:2})
    return passwordEntered
}).then(function(){
    let loginButtonClick=page.click('button[data-analytics="LoginPassword"]', {delay:50})
    return loginButtonClick
}).then(function(){
    let clickOnAlgoPromise=waitAndClick('.topic-card a[data-attr1="algorithms"]',page)
    return clickOnAlgoPromise
}).then(function(){
    let getToWarmUp=waitAndClick('input[value="warmup"]',page)
    return getToWarmUp
}).then(function(){
    let waitFor3seconds=page.waitFor(3000)
    return waitFor3seconds
}).then(function(){
    let allChallengesPromise=page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay:10})
    return allChallengesPromise;
}).then(function(questionArr){
    console.log('Number of questions on page ',questionArr.length)
    let questionWillBeSolved=questionSolver(page,questionArr[1],codeObj.answers[0])
    return questionWillBeSolved
})


function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
        let waitForModelPromise=cPage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModel=cPage.click(selector)
            return clickModel
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
    })
}

function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let questionWillBeClicked=question.click()
        questionWillBeClicked.then(function(){
            let EditorInFocusPromise=waitAndClick('.monaco-editor.no-user-select.vs',page)
            return EditorInFocusPromise
        }).then(function(){
            return waitAndClick('.checkbox-input',page)
        }).then(function(){
            return page.waitForSelector('textarea.custominput',page)
        }).then(function(){
            return page.type('textarea.custominput',answer,{delay:10})
        }).then(function(){
            let controlIsPressed=page.keyboard.down('Control')
            return controlIsPressed
        }).then(function(){
            let AisPressed=page.keyboard.press('A',{delay:40})
            return AisPressed
        }).then(function(){
            let XisPressed=page.keyboard.press('X',{delay:40})
            return XisPressed
        }).then(function(){
            let controlUnpressed=page.keyboard.up('Control')
            return controlUnpressed
        }).then(function(){
            let mainEditor=waitAndClick('.monaco-editor.no-user-select.vs',page)
            return mainEditor
        }).then(function(){
            let controlPress=page.keyboard.down('Control')
            return controlPress
        }).then(function(){
            let APressed=page.keyboard.press('A')
            return APressed
        }).then(function(){
            let VPressed=page.keyboard.press('V')
            return VPressed
        }).then(function(){
            let leaveControl=page.keyboard.up('Control')
            return leaveControl
        }).then(function(){
            return page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled',{delay:40})
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject();
        })
    })
}
 