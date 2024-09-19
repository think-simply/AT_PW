const customRetries = async(page,locator,attempts,retryNumber) => {
  while(attempts < retryNumber){
    try {
    await expect(locator).toBeVisible()
    break;
    } catch(e){
      attempts++;
      if (attempts > retryNumber){
        throw e
      }

      await page.waitForTimeout(1000)

    }

  }
}

export async function retry(){
  
}