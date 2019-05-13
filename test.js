const webdriver = require('selenium-webdriver')
const { By, until, Builder } = require('selenium-webdriver')

const fs = require('fs');
const main = async () => {

    const driver = new Builder().forBrowser('chrome').build();
    driver.manage().window().maximize();
    driver.manage().deleteAllCookies();
    // await driver.get('https://tasks-manager-local.herokuapp.com/index.html');
    let url = process.argv[2] || "https://w3schools.com"
    console.log(url,"-----",process.argv[2])
    await driver.get(url);
    var totalHeight = await driver.executeScript('return document.body.offsetHeight');
    // var windowHeight = await driver.executeScript('return window.outerHeight');
    var windowHeight = await driver.executeScript('return document.documentElement.clientHeight');
    console.log(totalHeight, windowHeight)
    for (var i = 0; i <= (totalHeight / windowHeight); i++) {
        console.log(windowHeight * i)
        await driver.executeScript(`window.scrollTo(0, ${windowHeight * i})`).catch(e => { console.log("There is error") })
        console.log("Done --->", i)
        let data2 = await driver.takeScreenshot()
        fs.writeFileSync(`screenshots/Image-${i}.png`, data2, 'base64')
    }
    driver.quit()

}

const wait = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("wait complete")
            return resolve();
        }, 2000)
    })
}
main()


