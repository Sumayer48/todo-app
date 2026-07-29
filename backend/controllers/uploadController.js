const uploadImages = (req, res) => {

    res.status(200).json({
        success: true,
        file: req.files
    });
};

const deleteImage = (req, res) => {
    const filename = req.params.filename;
    
    const filePath = path.join(__dirname, '/..uploads', filename);

    fs.unlink(filePath, (err) => {
        if(err) {
            return res.status(404).json({
                success: false,
                message: 'File not found'
            });
        };

        res.json({
            success: true,
            message: 'File deleted successfully'
        });
    });
};

module.exports = {
    uploadImages,
    deleteImage
};