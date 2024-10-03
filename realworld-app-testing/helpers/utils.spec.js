//các function được sử dụng chung và nhiều giữa các file.js

// get random number
export const getUniqueNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1)
    const day = now.getDate()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
  
    const uniqueNumber = Number(`${year}${month}${day}${hours}${minutes}${seconds}`)
  
    return uniqueNumber;
  }
  // để lại để tham khảo
  //   export const retry = () => {
  //   // function here

  // }
  

  // const customRetries = async(page,locator,attempts,retryNumber) => {
  //   while(attempts < retryNumber){
  //     try {
  //     await expect(locator).toBeVisible()
  //     break;
  //     } catch(e){
  //       attempts++;
  //       if (attempts > retryNumber){
  //         throw e
  //       }
  
  //       await page.waitForTimeout(1000)
  
  //     }
  
  //   }
  // }
  
  // export async function retry(){
    
  // }
  
  // /**
  //  * Helper functions for realworld-app-testing
  //  * 
  //  * 
  //  * * */