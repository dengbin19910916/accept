/**
 * Created by dengb on 2016/12/25.
 */
$(function () {
    kendo.culture("zh-CN");

    var data = [
        "12 Angry Men",
        "Il buono, il brutto, il cattivo.",
        "Inception",
        "One Flew Over the Cuckoo's Nest",
        "Pulp Fiction",
        "Schindler's List",
        "The Dark Knight",
        "The Godfather",
        "The Godfather: Part II",
        "The Shawshank Redemption"
    ];

    $("#idCardType").kendoDropDownList({
        dataTextField: "DESCRIPTION",
        dataValueField: "CODE",
        optionLabel: "--请选择--",
        dataSource: {
            transport: {
                read: {
                    url: "http://localhost/param/idCardType",
                    dataType: "json"
                }
            }
        }
    });

    $("#search").kendoComboBox({
        dataSource: data,
        separator: ", "
    });

    $("#time").kendoDropDownList({
        optionLabel: "--Start time--"
    });

    $("#amount").kendoNumericTextBox();

    $("#ticketsForm").kendoValidator({
        rules: {
            identity: function() {

            }
        },
        message: {
            identity: "身份证号码不正确"
        }
    });

    /*var validator = $("#ticketsForm").kendoValidator({
            validateOnBlur: false
        }).data("kendoValidator"),
        status = $(".status");

    $("form").submit(function (event) {
        event.preventDefault();
        if (validator.validate()) {
            status.text("Hooray! Your tickets has been booked!")
                .removeClass("invalid")
                .addClass("valid");
        } else {
            status.text("Oops! There is invalid data in the form.")
                .removeClass("valid")
                .addClass("invalid");
        }
    });*/

    // let container = $("#inputForm");
    // kendo.init(container);

    // let dlrData = [
    //     {text: "经销商1", value: "1"},
    //     {text: "经销商2", value: "2"},
    //     {text: "经销商3", value: "3"}
    // ];
    //
    // // 经销商
    // $("#dlr").kendoDropDownList({
    //     dataTextField: "text",
    //     dataValueField: "value",
    //     dataSource: dlrData,
    //     optionLabel: "--请选择--"
    // });
    //
    // // // 手机号码
    // // $("#phoneNumber").kendoMaskedTextBox({
    // //     mask: "000 0000 0000"
    // // });
    //
    // // 身份证类型
    // $("#idCardType").kendoDropDownList({
    //     dataTextField: "DESCRIPTION",
    //     dataValueField: "CODE",
    //     dataSource: {
    //         transport: {
    //             read: {
    //                 url: "http://localhost/param/idCardType",
    //                 dataType: "json"
    //             }
    //         }
    //     },
    //     optionLabel: "--请选择--"
    // });
    //
    // // 身份证类型
    // $("#gender").kendoDropDownList({
    //     dataTextField: "DESCRIPTION",
    //     dataValueField: "CODE",
    //     dataSource: {
    //         transport: {
    //             read: {
    //                 url: "http://localhost/param/genderType",
    //                 dataType: "json"
    //             }
    //         }
    //     },
    //     optionLabel: "--请选择--"
    // });
    //
    // // 出生日期
    // $("#birthday").kendoDatePicker({
    //     start: "decade",
    //     depth: "month",
    //     format: "yyyy-MM-dd",
    //     disableDates: function (date) {
    //         let disabled = new Date();
    //         return !!(date && date > disabled);
    //     }
    // });
});