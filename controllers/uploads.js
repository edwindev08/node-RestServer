const path = require('path')
const { response } = require("express")




const uploadFile = (req, res = response ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.img) {
        res.status(400).json("No hay archivos en la petición.");
        return;
    }

    const { img } = req.files;

    const imgName = img.name.split('.')

    console.log(imgName)

    // const uploadPath = path.join(__dirname, '../uploads/', img.name);

    // img.mv(uploadPath, (err) => {
    //     if (err) {
    //     return res.status(500).json({err});
    //     }

    //     res.json({msg: 'File uploaded to ' + uploadPath});
    // });

}


module.exports = {
    uploadFile
}