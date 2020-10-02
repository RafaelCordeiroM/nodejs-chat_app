module.exports = (app) => {

    const port = process.env.PORT || 3000 //setting port
    return app.listen(port,()=>console.log(`server running o port ${port}`))
    
}