document.addEventListener("DOMContentLoaded", function () {
    let join_button, contact_background, contact_container, contact_close

    join_button = document.getElementsByClassName("banner-contact-button")[0]
    contact_background = document.getElementsByClassName("contact-background")[0]
    contact_container = document.getElementsByClassName("contact-container")[0]
    contact_close = document.querySelector('.contact>.close');
    contact_submit = document.querySelector('.contact>.contact-submit>input');
    contact_form = document.querySelector('#contact-form');


    join_button.addEventListener("click", function () {
        contact_background.style.display = "block"
        contact_container.style.display = "block"
    })

    contact_close.addEventListener("click", function () {
        contact_background.style.display = "none"
        contact_container.style.display = "none"
    })


    function validateForm() {
        var name = document.forms["contact-form"]["contact-name"].value;
        var mail = document.forms["contact-form"]["contact-mail"].value;
        var job = document.forms["contact-form"]["contact-who"].value;


        const mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


        if (name == "") {
            alert("Vui lòng nhập tên.");
            return false;
        }

        if (!mailRegex.test(mail)) {
            alert("Vui lòng nhập mail.");
            return false;
        }

        if (job == 'Không rõ') {
            alert("Vui lòng cho biết công việc")
            return false;
        }

        return true;
    }



    $(document).ready(function () {

        $('#contact-form').submit(function (event) {
            // Ngăn chặn việc tải lại trang khi submit form
            event.preventDefault();
            if (!validateForm()) {
                return;
            }
            else {
                contact_background.style.display = "none"
                contact_container.style.display = "none"


                // Gửi AJAX yêu cầu đến server
                $.ajax({
                    url: '/',
                    type: 'POST',
                    data: $(this).serialize(), // Gửi dữ liệu từ form
                    success: function (response) {
                        alert(response.message)
                    },
                    error: function (error) {
                        alert(err);
                    }
                });
            }


        });
    });

});





