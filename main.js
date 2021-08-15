$(function () {
    //Text style function(text-decoration,cursive,bold)
    function textStyle(button, elem, stClass) {
        $(button).click(function () {
            $(elem).toggleClass(stClass);
        })
    }
    //Text alignment function
    function textAlign(button, elem, toggleClass, removeClass) {
        $(button).click(function () {
            $(elem).children().toggleClass(toggleClass);
            $(elem).children().removeClass(removeClass);
        })
    }
    textStyle('.bold', '.text', 'bold')
    textStyle('.line-through', '.text', 'lineThrough')
    textStyle('.underline', '.text', 'underline')
    textStyle('.i', '.text', 'cursive')
    textAlign('.align-left', '.text', 'left', 'right center')
    textAlign('.align-right', '.text', 'right', 'left center')
    textAlign('.align-center', '.text', 'center', 'right left')
    //Set the style for the drop-down list
    let li1 = document.getElementsByClassName('fontFamily')
    for (const i of li1) {
        i.style.fontFamily = i.textContent
    }
    let li2 = document.getElementsByClassName('fontSize')
    for (const i of li2) {
        i.style.fontSize = i.textContent;
    }
    let click = 0;
    //Function of appearance and disappearance of the drop-down list
    //   and locking the adjacent button so that drop-down lists don't overlap
    function displayUl(btnClick, ul, btnDisabled) {
        $(btnClick).click(function () {
            click++
            if (click == 1) {
                $(ul).css('display', 'block');
                $(btnDisabled).attr('disabled', true)
            }

            if (click == 2) {
                $(ul).css('display', 'none');
                click = 0;
                $(btnDisabled).attr('disabled', false)
            }
        })
        //The drop-down list dissapear, when user click on the text block
        $('.text').click(function () {
            $(ul).css('display', 'none');
            $(btnDisabled).attr('disabled', false);
            click = 0;
        })
    }
    displayUl($('.font-family'), $('.first-ul'), $('.font-size'));
    displayUl($('.font-size'), $('.second-ul'), $('.font-family'));
    //Set the font family and font-size  for the text
    $('.fontFamily').click(function () {
        click = 0;
        $('.font-size').attr('disabled', false)
        $('.text ').css('font-family', $(this).text());
    });
    $('.fontSize').click(function () {
        $('.font-family').attr('disabled', false)
        click = 0;
        $('.text p').css('font-size', $(this).text());
    })
    //Style setting function for a drop-down list when the user focuses on the li element
    function liFocus(btn, elemFadeOut, elemCss) {
        $(btn).click(function () {
            $(this).css({
                'backgroundColor': '#3892ef',
                color: 'white',
            })
            $(elemFadeOut).fadeOut(200, function () {
                $(elemCss).css({
                    'backgroundColor': 'white',
                    color: 'black',
                })
            });
        })
    }
    liFocus($('.fontSize'), $('.second-ul'), $('.fontSize'))
    liFocus($('.fontFamily'), $('.first-ul'), $('.fontFamily'))

    //set the color of the text
    $('.block-color').click(function () {
        $('.text').css('color', $(this).css('background-color'))
    })
    //Set the background color for body
    $('.block-color1').click(function () {
        $('body').css('background-color', $(this).css('background-color'));
        $('body').css('background-image', 'none')
    })
    //Set the background image for body  
    $('.background-image').click(function () {
        $('body').css('background-image', $(this).css('background-image'))
        $('body').css('background-color', `white`)
    })

    //Set a background image for your body using a file from your computer
    $('.inpFile').on('change', function (ev) {
        let f = ev.target.files[0];
        let fr = new FileReader();
        fr.onload = function (ev2) {
            console.dir(ev2);
            $('body').css('background-image', `url(${ev2.target.result})`)
        }
        fr.readAsDataURL(f);
        $('.inpFile').val('');
        $('body').css('background-color', `white`)

    })
    //Reset the login form
    let f1 = document.forms.f1
    $('.lock').click(function () {
        f1.reset();
    })
    //Login form validation
    $('.signIn').click(function (event) {
        event.preventDefault()
        let login = $('.login').val();
        let password = $('.password').val();
        let regExpLogin = /^[a-zA-Z]{2,20}$/;
        let regExpPassword = /^[a-zA-Z0-9]{5,15}$/;
        let validLogin = regExpLogin.test(login);
        let validPassword = regExpPassword.test(password);
        //Object with form fields names and their valideted values
        let error = {
            login: validLogin,
            password: validPassword,
        }
        let keyfalse = Object.keys(error).filter(key => error[key] === false);
        let keytrue = Object.keys(error).filter(key => error[key] === true);
        //Set styles for fields with valid values
        keytrue.forEach(elem => {
            document.querySelector(`.${elem}`).style.cssText = 'border: 2px solid #dee2e6';
            $('.error1').css('display', 'none');
            $('.error2').css('display', 'none');
            $(`.${elem}`).focus(function (event) {
                $(this).css('box-shadow', 'none')
                document.querySelector(`.${elem}`).style.cssText = 'border: 2px solid #dee2e6';
            })
        });

        if (validLogin == true && validPassword == true) {
            setTimeout(() => $('#modal3 [data-bs-dismiss=modal]').trigger({
                type: "click"
            }), 100)
            $('.code').removeAttr('disabled');
            $('.unlockIcon').css('display', 'block');
            $('.lockIcon').css('display', 'none');
            $('.lock').addClass('unlock');
            $('.unlock').attr('data-bs-target', "#modal3-2")
            $('.lock').removeClass('lock');

        }
        //Set styles for fields with invalid values
        keyfalse.forEach(elem => {
            if (login == '' || password == '') {
                $('.error2').css('display', 'none');
                $('.error1').css('display', 'block');
            } else {
                $('.error2').css('display', 'block');
                $('.error1').css('display', 'none');
            }
            document.querySelector(`.${elem}`).style.cssText = 'border: 1px solid #cd1d3ee8;';
            $(`.${elem}`).focus(function (event) {
                event.target.style.cssText = 'box-shadow:0 0 0 3px hsl(4deg 100% 70% / 52%);border: 1px solid #cd1d3ee8';
            })
            $(`.${elem}`).blur(function (event) {
                event.target.style.cssText = 'box-shadow:none;border: 1px solid #cd1d3ee8';
            })
        });
        //Page where user can create a table or lists and change innerHtml of element $('.text') appears
        $('.code').click(function () {
            $('.page1').css('display', 'none');
            $('.page2').css('display', 'block');

        })
    })

    //Function sign out
    $('.signOut').click(function () {
        signOut = true
        $('.code').attr('disabled', 'true');
        $('.unlockIcon').css({
            'display': 'none',
        });

        $('.unlock').addClass('lock');
        $('.lock').removeClass('unlock');
        $('.lockIcon').css({
            'margin': '0px 0px 0px 15px',
            'display': 'block'
        });
        $('.lock').attr('data-bs-target', "#modal3");
        setTimeout(() => $('#modal3-2 [data-bs-dismiss=modal]').trigger({
            type: "click"
        }), 100)
    })

    $('.blockInnerHtml').text($('.text').html())
    //Function that reset form and  takes away the styles that were added during validation
    function reset(form, elem, errMessage) {
        $(elem).css({
            'border': '1px solid #dee2e6',
            'box-shadow': 'none',
        })
        $(errMessage).css('display', 'none');
        $(elem).focus(function (event) {
            $(event.target).css({
                'box-shadow': ' 0 0 0 4px rgb(69 136 255 / 40%)',
                border: '1px solid #dee2e6'
            })
        })
        $(elem).blur(function (event) {
            $(event.target).css({
                'box-shadow': 'none',
                border: '1px solid #dee2e6'
            })
        })
        $(form).val('')
    }
    let content, clickCreate
    //Click on the button to create a table
    $('.create').click(function (event) {
        event.preventDefault()
        clickCreate = true;
        let countTR = $('.countTR').val();
        let countTD = $('.countTD').val();
        let widthTD = $('.widthTD').val();
        let heightTD = $('.heightTD').val();
        let widthBorder = $('.widthBorder').val();
        let typeBorder = $('.typeBorder').val();
        let colorBorder = $('.colorBorder').val();
        let regExpTable = /^[1-9]{1}[0-9]?$/;
        let regExpSelect = /^[^c]/;
        let validCountTR = regExpTable.test(countTR);
        let validCountTD = regExpTable.test(countTD);
        let validWidthTD = regExpTable.test(widthTD);
        let validHeightTD = regExpTable.test(heightTD);
        let validWidthBorder = regExpTable.test(widthBorder);
        let validTypeBorder = regExpSelect.test(typeBorder);
        let validColorBorder = regExpSelect.test(colorBorder);
        //Object with form fields names and their valideted values
        let errorTable = {
            countTR: validCountTR,
            countTD: validCountTD,
            widthTD: validWidthTD,
            heightTD: validHeightTD,
            widthBorder: validWidthBorder,
            colorBorder: validColorBorder,
            typeBorder: validTypeBorder
        }
        validateArr(errorTable, $('.errorT'), 7)

        let tr, td, table, div
        if (check == true) {
            div = document.createElement('div');
            table = document.createElement('table');

            //Table creation cycle.
            for (let i = 0; i < countTR; i++) {
                tr = document.createElement('tr');
                for (let j = 0; j < countTD; j++) {
                    td = document.createElement('td')
                    td.textContent = 'TD';
                    td.style.color = $('.text p').css('color');
                    td.style.cssText = `width:${widthTD+ 'px'}; height: ${heightTD+ 'px'};border: ${widthBorder+ 'px'} ${typeBorder} ${colorBorder}`;
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
            div.appendChild(table);
            content = $('.blockInnerHtml').val();
            $('.blockInnerHtml').val(`${content}${div.innerHTML}`)

            //Function of adding a table to the $('.text') element.
            $('.saveBtn').click(function () {
                let tbody = document.createElement('tbody');
                tbody.appendChild(tr);
                table.appendChild(tbody);
                div.appendChild(table);
                $('.blockInnerHtml').val($('.text').html());
                $('.page1').css('display', 'block');
                $('.page2').css('display', 'none');
            })
        }
    })
    //Reset the form $('#fTable')
    $('.reset').click(function (e) {
        reset($('#fTable'), $('#fTable input'), $('.errorT'))
        reset($('#fTable'), $('#fTable select'), $('.errorT'))
    })
    let countO, countU, typeO, typeU
    //After clicking on the button, unordered list is created
    $('#Ul').click(function () {
        countU = $('.countUl').val();
        typeU = $('.typeMarkUl').val();
        console.log('countU', countU);
        let regExpCountU = /^[1-9]{1}[0-9]?$/;
        let regExpTypeU = /[^k]$/;
        let validcountLiU = regExpCountU.test(countU);
        let validTypeMarksU = regExpTypeU.test(typeU);
        //Object with form fields names and their valideted values
        let errorUl = {
            countUl: validcountLiU,
            typeMarkUl: validTypeMarksU,
        }

        validateArr(errorUl, $('.errorMessageU'), 2)

        if (validcountLiU == true && validTypeMarksU == true) {
            createList('ul', countU, typeU)
        }
    })
    $('#Ol').click(function () {
        countO = $('.coutOl').val();
        typeO = $('.typeMarkOl').val();
        let regExpCount = /^[1-9]{1}[0-9]?$/;
        let regExpType = /[^k]$/;
        let validcountLiO = regExpCount.test(countO);
        let validTypeMarksO = regExpType.test(typeO);
        //Object with form fields names and their valideted values
        let errorOl = {
            coutOl: validcountLiO,
            typeMarkOl: validTypeMarksO,
        }
        validateArr(errorOl, $('.errorMessageO'), 2)
        if (validcountLiO == true && validTypeMarksO == true) {
            createList('ol', countO, typeO)
        }
    })

    //List creation function
    function createList(elem, count, type) {
        let divList = document.createElement('div');
        let li, list;
        //List creation cycle.
        list = document.createElement(elem);
        list.classList.add('newList');
        for (i = 1; i <= count; i++) {
            li = document.createElement('li');
            li.textContent = `item ${i}`;
            li.style.listStyleType = `${type}`;
            list.appendChild(li);
        }
        divList.appendChild(list);
        content = $('.blockInnerHtml').val();
        $('.blockInnerHtml').val(`${content}${divList.innerHTML}`)
    }
    $('.saveBtn').click(function () {
        $('.text').html($('.blockInnerHtml').val())
        $('.reset').trigger('click')
        $('#resetO').trigger('click')
        $('#resetU').trigger('click')
        $('.page1').css('display', 'block');
        $('.page2').css('display', 'none');
    })
    //Reset the form which creates an ordered list
    $('#resetO').click(function () {
        reset($('#fOl'), $('#fOl select'), $('.errorMessageO'))
        reset($('#fOl'), $('#fOl input'), $('.errorMessageO'))
        console.log('O');
    })
    //Reset the form which creates an unordered list
    $('#resetU').click(function () {
        reset($('#fUl'), $('#fUl select'), $('.errorMessageU'))
        reset($('#fUl'), $('#fUl input'), $('.errorMessageU'))
        console.log('U');
    })

    //Add focus to custom input[type ="file"]
    $('#inputGroupFile02').focus(function () {
            $('label').addClass('focus');
        })
        .focusout(function () {
            $('label').removeClass('focus');
        });

    //Form validation function for creating a list or a table
    function validateArr(arr, error, lengthTrue) {
        let keyfalse = Object.keys(arr).filter(key => arr[key] === false);
        let keytrue = Object.keys(arr).filter(key => arr[key] === true);
        //Set styles for fields with invalid values
        keyfalse.forEach(elem => {
            $(error).css('display', 'block');
            $(`.${elem}`).css('border', '1px solid #cd1d3ee8')
            $(`.${elem}`).focus(function (event) {
                event.target.style.cssText = 'box-shadow:0 0 0 3px hsl(4deg 100% 70% / 52%);border: 1px solid #cd1d3ee8';
            })
            $(`.${elem}`).blur(function (event) {
                event.target.style.cssText = 'box-shadow:none;border: 1px solid #cd1d3ee8';
            })
        });
        //Set styles for fields with valid values
        keytrue.forEach(elem => {
            $(`.${elem}`).css('border', '2px solid #dee2e6');
            if (keytrue.length == lengthTrue) {
                $(error).css('display', 'none');
            }
            $(`.${elem}`).focus(function (event) {
                $(this).css({
                    'box-shadow': 'none',
                    'border': '2px solid #dee2e6'
                })
                document.querySelector(`.${elem}`).style.cssText = 'border: 2px solid #dee2e6';
            })
            if (clickCreate == true && keytrue.length == 7) {
                check = true;
            }
        });
    }
    //Set styles for modal $('#exampleModal')
    $(`.nav-link`).click(function () {
        if ($(`#files-tab`).hasClass('active')) {
            $('#exampleModal .modal-body').css('height', '126px')
        }
        if ($(`#files-tab`).hasClass('active')) {
            $('#exampleModal .modal-body').css('height', '126px')
        }
        if ($(`#files-tab`).hasClass('active') == false) {
            $('#exampleModal .modal-body').css('height', 'auto')
        }
    })
})
