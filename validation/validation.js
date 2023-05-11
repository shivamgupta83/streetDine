const validAll=(value)=>{
    if(value.trim().length===0) return false
    return true
 }


const validName = function (value) {
    value=value.trim().replace(/\s+/g, ' ')
    let name = /^[a-zA-Z. ]{3,}$/
    return name.test(value)
    }


const validemail = function (value) {
    value=value.trim()
            let email = /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/
        return email.test(value)
        }

const validImage = function (image) {
            return /(\.jpg|\.jpeg|\.bmp|\.gif|\.PNG|\.png)$/.test(image)
        }

module.exports={validAll,validName,validemail,validImage}