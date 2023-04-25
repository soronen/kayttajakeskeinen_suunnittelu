*** Settings ***
Library     Browser


*** Variables ***
${BROWSER}      chromium
${EMAIL}        eetu.soronen
${PASSWORD}     password123


*** Test Cases ***
Check Kymmenen Uutiset
    Open Yle Areena
    Go To TV Opas
    Check Kymmenen Uutiset

Check Channel Labels
    Open Yle Areena
    Go To TV Opas
    Check Channel Logo Labels

Kummelit Episode
    Open Yle Areena
    Go To Kummeli With Searcbox
    Go To K3J5
    Check Title And Release Date

Create Invalid Account
    Open Yle Areena
    Go To Register
    Fill Register Form With Invalid Email
    Submit And Check For Errors


*** Keywords ***
Go To Register
    Click    css=[class*='yle-header-tunnus-login']
    Click    iframe.tunnus-sdk__iframe >>> .register-button

Fill Register Form With Invalid Email
    Set Selector Prefix    iframe.tunnus-sdk__iframe >>>
    Fill Text    id=email    ${EMAIL}
    Fill Text    id=password    ${PASSWORD}
    Select Options By    select[name=month]    label    Elokuu
    Select Options By    select[name=year]    label    2001
    Click    input[aria-labelledby="registerAcceptTosLabel"]

Submit And Check For Errors
    Set Selector Prefix    iframe.tunnus-sdk__iframe >>>
    Click    button[type="submit"]
    Wait For Elements State    //li[contains(text(),'Tarkista sähköpostiosoitteen muoto.')]
    Wait For Elements State    text="Rekisteröityminen ei onnistunut, tarkista antamasi tiedot."

Open Yle Areena
    New Browser    ${BROWSER}    headless=False
    New Page    https://areena.yle.fi/tv
    ${title}=    Get Title
    Should Contain    ${title}    Yle Areena
    Wait Until Network Is Idle

Go To TV Opas
    Click    //a[@href='/tv/opas']
    ${title}=    Get Title
    Should Contain    ${title}    TV-opas

Check Kymmenen Uutiset
    Get Element
    ...    xpath=//div[@class="schedule-card__header"]//span[@itemprop="name" and contains(text(),"Kymmenen uutiset")]//ancestor::div[contains(@class,"schedule-card__header")]//time[@itemprop="startDate" and contains(text(),"22.00")]

Check Channel Logo Labels
    ${elements}=    Get Elements    css=.class > \#channel-header__link
    FOR    ${element}    IN    @{elements}
        ${aria_label}=    Get Attribute    ${element}    aria-label
        Should Not Be Empty    ${aria_label}
    END

Go To Kummeli With Searcbox
    ${searchbox}=    Get Element    css=[name='query']
    Type Text    ${searchbox}    Kummeli
    Click    //a[@href='/1-3339547']

Go To K3J5
    ${title}=    Get Title
    Should Contain    ${title}    Kummeli
    Click    //button[contains(text(),'Kausi 3')]
    Click    //a[@href='/1-1796319']
    ${title}=    Get Title
    Should Contain    ${title}    K3, J5

Check Title And Release Date
    Get Element    //p[contains(text(),'Legendaarista Kummelipelleilyä vuodelta 1993')]
    Get Element    //time[contains(text(), '10.1.2006')]