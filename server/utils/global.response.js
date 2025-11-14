export const sucessResponse = (res, message = "Success", data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
        sucess:true,
        message,
        data
    })

}