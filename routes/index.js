const express = require('express');
const router = express.Router();
//========================= KHAI BÁO KẾT NỐI DATABASE MONGOOSE DB
const db = "mongodb+srv://danglh0603:Lehaidang123@cluster0.q4scs.mongodb.net/Lab05?retryWrites=true&w=majority";
const mongoose = require('mongoose');
mongoose.connect(db).catch(error => {
    console.log("co loi xay ra" + error);
});
// upload file
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1 * 1024,
    }
}).single("avatar");


router.post('/DangKi', function (req, res, next) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.render("DangKiTaiKhoan", {title: "Dang Ki", message: err.message});

        } else {
            res.render("DangKiTaiKhoan", {title: "Dang Ki", message: "Da upload!"});

        }
    });
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Home'});
});
//
router.get('/asia', function (req, res, next) {
    var stData = fs.readFileSync("myFile/data.txt").toString();
    let data = JSON.parse(stData)
    // console.log(data);
    res.render('Asian', {title: 'Asia', data: data});
});
//
router.get('/euro', function (req, res, next) {
    res.render('Euro', {title: 'Euro'});
});
//
router.get('/america', function (req, res, next) {
    res.render('American', {title: 'America'});
});
//
router.get('/about', function (req, res, next) {
    res.render('about', {title: 'About'});
});
//
router.get('/DangKiTaiKhoan', function (req, res, next) {
    res.render('DangKiTaiKhoan', {title: 'DangKiTaiKhoan', message: ""});
});
///================================== HIỂN THỊ CÁC LOẠI DỮ LIỆU LÊN HTML
router.get('/hot', function (req, res, next) {
    const diaChi = "Nam tu liem - Ha Noi";
    const mang = [1, 2, 4, 1, 4, 6, 2, 0];
    const sinhVien = {name: "leHaiDang", sinhNhat: "01-01-2002", sdt: "0124124"};
    const danhSach = [
        {name: "leHaiDang1", sinhNhat: "01-01-2002", sdt: "0124124"},
        {name: "leHaiDang2", sinhNhat: "01-01-2002", sdt: "0124124"},
        {name: "leHaiDang3", sinhNhat: "01-01-2002", sdt: "0124124"},
        {name: "leHaiDang4", sinhNhat: "01-01-2002", sdt: "0124124"}];

    // bien kieu ket hop
    var thongTin = {
        name: "lhd",
        yeuThich: "dwdwd",
        danhSachBanGai: [
            {name: "leHaiDang5", sinhNhat: "01-01-2002", sdt: "0124124"},
            {name: "leHaiDang6", sinhNhat: "01-01-2002", sdt: "0124124"},
            {name: "leHaiDang7", sinhNhat: "01-01-2002", sdt: "0124124"},
            {name: "leHaiDang8", sinhNhat: "01-01-2002", sdt: "0124124"}]
    }
    res.render('hot', {
        title: 'Hot',
        diaChi: diaChi,
        mang: mang,
        sinhVien: sinhVien,
        danhSach: danhSach,
        thongTin: thongTin
    });
});
//
// router.get('/form', function (req, res, next) {
//     res.render('Form', {title: 'Form', message: ""});
// });
//
router.get('/Add', function (req, res, next) {
    res.render('Add', {title: 'Add', message: ""});
});
//
router.get('/Update', function (req, res, next) {
    res.render('Update', {title: 'Update', message: ""});
});
//


//// ===================================== ĐỌC GHI FILE
const fs = require("fs");
const {render} = require("ejs");
router.post("/testForm", function (req, res) {
    const name = req.body.ten;
    const phoneNumber = req.body.soDienThoai;
    const content = req.body.content;

    fs.appendFile("myFile/uploads.txt", "Tên: " + name +
        "\nSố điện thoại: " + phoneNumber +
        "\nNội dung: " + content + "\n", function (err) {
        if (err) {
            res.render("form", {message: err})
        } else {
            res.render("form", {message: "Đã lưu thông tin!"});
        }
    });
});
// ================================SLIDE 7 KẾT NỐI MONGOOSE DATABASE
////khai báo Schema(giống model trong java)
// var studentSch = new mongoose.Schema({
//   name:"string",
//   sdt:"string",
//   add:"string",
// });
// // khai báo schema với thư viện moogoose
// var Student = mongoose.model("student",studentSch);
// router.post("/Student",function (req,res){
//   const name = req.body.ten;
//   const phoneNumber = req.body.soDienThoai;
//   const add = req.body.Address;
//
//   console.log(name +" = "+phoneNumber +" = "+add);
//
//   const data = new Student({
//     name: name,
//     sdt: phoneNumber,
//     add: add
//   });
//   var mess = "" ;
//   // add du lieu
//   data.save(function (err){
//      if (err == null){
//        mess = "them thanh cong!";
//
//      }else {
//        mess="them that bai";
//        console.log(err);
//      }
//     res.render('Form', { title: 'Form' , message :mess})
//   });
//
//   // get dulieu
//   Student.find({},function (err,data){
//     console.log(data);
//     res.render('Form', { title: 'Form' , data:data,message:""});
//   });// getall data
// // xoa data
// //   Student.deleteOne({_id:""},function (err){
// //
// //   });
//   // sua data
//   Student.updateOne({_id:""},{name:"hhhhh",sdt:"88888888",add:"oooooo"},function (err){
//
//   })
// });
///==========================
/////======================================LAB05
var AnhLab05 = new mongoose.Schema({
    ten: "string",
    noiDung: "string",
    link: "string",
});
var anh = mongoose.model("AnhLab05", AnhLab05);
// add anh
router.post("/AddImage", function (req, res) {
    const ten = req.body.ten;
    const noiDung = req.body.noiDung;
    const link = req.body.linkAnh;

    const data = new anh({
        ten: ten,
        noiDung: noiDung,
        link: link
    });
    var mess = "";
    // add du lieu
    data.save(function (err) {
        if (err == null) {
            mess = "them thanh cong!";
        } else {
            mess = "them that bai";
            console.log(err);
        }

    });
    res.render('Add', {title: 'Add', message: ""});
});
//getAll anh
router.get('/List', function (req, res, next) {
    anh.find({}, function (err, data) {
        console.log(data);
        res.render('List', {title: 'List', data: data, message: ""});
    });// getall data
});
//

//chuyen sang man update, auto fill data
router.post('/Update', function (req, res, next) {
    let id = req.body.id;
    anh.find({_id: id}, function (err, data) {
        if (err == null) {
            res.send(data);
        } else {
            console.log("1 ====" + data);
            res.render('Update', {title: 'Update', _data: data});
        }
    });// get data theo id
});
router.post('/UpdateImage', function (req, res, next) {
    let id = req.body._id;
    let ten = req.body.ten;
    let noiDung = req.body.noiDung;
    let link = req.body.linkAnh;
    console.log(id+"\n"+ten+"\n"+noiDung+"\n"+link);
    //
    anh.updateOne({_id: id}, {ten: ten, noiDung: noiDung, link: link}, function (err) {
        if (err == null) {
            res.render("Update", {title: "Update", message: "Update thanh cong!"});

        } else {
            res.render("Update", {title: "Update", message: "Update that bai!"});
        }

    })


});
// click button update
// router.post("/Update",function (req,res,){
//     let id = req.body.id;
//     let ten = req.body.ten;
//     let noiDung = req.body.noiDung;
//     let link = req.body.linkAnh;
//     anh.updateOne({_id:id},{ten:ten,noiDung:noiDung,link:link},function (err){
//         if (err==null){
//             res.render('Update', {title: 'Update', message: "Update thanh cong!"});
//         }else {
//             console.log(err.message);
//             res.render('Update', {title: 'Update', message: "Update that bai!"});
//         }
//     })
// })
// xoa image
// ================================delete image
router.post("/delete", function (req, res) {
    let id = req.body.id;
    anh.deleteOne({_id: id}, function (err) {
        if (err != null) {
            res.render("List", {title: "List", message: "Xoa thanh cong!"});
        } else {
            res.render("List", {title: "List", message: "Xoa that bai!"});

        }
    })
})


module.exports = router;
