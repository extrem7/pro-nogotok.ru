'use strict';

var header = {
        mobile: function mobile() {
            jQuery('.header-mobile .filter').click(function (e) {
                e.preventDefault();
                jQuery('.sidebar').slideToggle();
            });
            jQuery('.header-mobile .toggle-btn').click(function () {
                jQuery('.header-mobile .menu').slideToggle();
            });
        }
    },
    upButton = {
        status: 0,
        can: 0,
        btn: '.scroll-up',
        controller: function controller() {
            jQuery(upButton.btn).click(function (e) {
                e.preventDefault();
                jQuery('html,body').animate({
                    scrollTop: 0
                }, {
                    duration: 1250
                });
            });
            jQuery(window).scroll(function () {
                if (jQuery(document).scrollTop() > 1000) {
                    jQuery('.scroll-up').fadeIn();
                } else {
                    jQuery('.scroll-up').fadeOut();
                }
            });
        }
    },
    school = {
        modals: function modals() {
            jQuery(".wpcf7").on('wpcf7:mailsent', function () {
                jQuery('#course').modal('hide');
                jQuery('#thanks').modal('show');
                setTimeout(function () {
                    jQuery('#thanks').modal('hide');
                }, 5000);
                yaCounter48380480.reachGoal('centr');
                return true;
            });
            jQuery(".wpcf7-tel").inputmask("+7(999)999-99-99");
        },
        catalogPage: function catalogPage() {
            jQuery('.control .btn-pink').click(function () {
                var title = 'Курс: ' + jQuery(this).closest('.course-item').find('.title-big').text();
                jQuery('.course-modal .subject').val(title);
            });
            this.modals();
        },
        singlePage: function singlePage() {
            var title = 'Курс: ' + jQuery('h1.title-big').text();
            jQuery('.course-modal .subject').val(title);
            this.modals();
        }
    },
    variableProduct = {
        update: function update() {
            var src = jQuery('.palette input:checked ').next('').css('background-image');
            src = src.replace('url(', '').replace(')', '').replace(/\"/gi, "");
            if (jQuery('.album .photo-big').attr('src') !== src) {
                jQuery('.small .active').removeClass('active');
                jQuery('.album .photo-big').fadeOut(200, function () {
                    jQuery(this).attr('src', src).fadeIn(200);
                });
            }

            var top = $('.before-content').offset().top + 100;
            $('body,html').animate({scrollTop: top}, Math.abs(top - $(document).scrollTop()) / 2);

            var variation = jQuery('.palette input:checked').parent().attr('data-variation-id');
            var id = jQuery('.product').attr('data-id');
            var quantity = jQuery('.quantity input').val();
            var name = jQuery('.palette input:checked').parent().find('.popover').text();
            var link = location.href + '?add-to-cart=' + id + '&variation_id=' + variation + '&quantity=' + quantity;

            jQuery('.product .add-to-cart').attr('href', link);
            jQuery('.choice').fadeOut(function () {
                jQuery(this).text(`Вами выбран: ${name}. Добавьте его в корзину`);
                jQuery(this).fadeIn();
            })
        },
        controller: function controller() {
            var _this = this;

            jQuery('.palette .item input').click(function (e) {
                e.stopPropagation();
                _this.update();
            });
            jQuery('.quantity input').change(function () {
                _this.update();
            });
        }
    },
    delivery = {
        status: false,
        controller: function controller() {
            var _this2 = this;

            jQuery('#delivery').change(function () {
                if (!_this2.status) {
                    jQuery('#billing_company').removeAttr('disabled');
                    jQuery('.address-details input,#billing_address_1, #billing_city').attr('disabled', 'disabled');
                    _this2.status = true;
                } else {
                    jQuery('#billing_company').attr('disabled', 'disabled');
                    jQuery('.address-details input,#billing_address_1, #billing_city').removeAttr('disabled');
                    _this2.status = false;
                }
            });
        }
    };

function addCart() {
    if (addToCart) {
        if (jQuery('body').hasClass('home-page')) {
            var top = jQuery('.products').offset().top;
            jQuery('body,html').animate({scrollTop: top}, 1500);
        }
        /*jQuery('#thanks-product').modal('show');
        setTimeout(function () {
            jQuery('#thanks-product').modal('hide');
        }, 10000);*/
    }
}

function productCounter() {
    var min = 1;
    jQuery('body').on('click', '.plus', function (e) {
        e.preventDefault();
        var input = jQuery(this).parent().find('input');
        var current = parseInt(jQuery(input).val());
        jQuery(input).val(current + 1).trigger("change");
        jQuery('.actions button').removeAttr('disabled');
        jQuery(".actions button").trigger("click");
    }).on('click', '.minus', function (e) {
        e.preventDefault();
        var input = jQuery(this).parent().find('input');
        var current = parseInt(jQuery(input).val());
        if (current > min) {
            jQuery(input).val(current - 1).trigger("change");
            jQuery('.actions button').removeAttr('disabled');
        }
        jQuery(".actions button").trigger("click");
    });
}

function catalogView() {
    jQuery('.show-as .show-block').click(function (e) {
        e.preventDefault();
        jQuery('.products .product-card-long').fadeOut(function () {
            jQuery('.products .product-card').show();
        });
        jQuery('.show-as .active').removeClass('active');
        jQuery(this).addClass('active');
    });
    jQuery('.show-as .show-list').click(function (e) {
        e.preventDefault();

        jQuery('.products .product-card').fadeOut(function () {
            jQuery('.products .product-card-long').css('display', 'flex');
        });
        jQuery('.show-as .active').removeClass('active');
        jQuery(this).addClass('active');
    });
}

function promotion() {
    jQuery('.promotion-item .btn-pink').click(function (e) {
        e.preventDefault();
        var content = jQuery(this).closest('.promotion-item').next();
        if (jQuery(content).hasClass('item-content')) {
            if (jQuery(this).text() === 'Подробнее') {
                jQuery('.item-content.active').prev().find('.btn-pink').text('Подробнее');
                jQuery('.item-content.active').slideUp().removeClass('active');
                jQuery(this).text('Скрыть');
            } else {
                jQuery(this).text('Подробнее');
            }
            jQuery(content).slideToggle().toggleClass('active');
        }
    });
}

function contactsMap() {
    $('.list a').on('shown.bs.tab', function (event) {
        let id = $(this).attr('href'),
            map = $.trim($(`${id} .map`).text()),
            title = $.trim($(`${id} .map-title`).html());
        if (map) {
            $('.banner-address .info p').fadeOut(function () {
                $(this).html(title);
            });
            $('.banner-address iframe').animate({opacity: 0}, function () {
                $(this).attr('src', map);
                setTimeout(() => {
                    $(this).animate({opacity: 1}, function () {
                        $(this).parent().find('.info p').fadeIn()
                    });
                }, 1000);
            });
        }
    });
}

function ajaxNews() {
    jQuery('.content .more').click(function (e) {
        e.preventDefault();
        var data = 'offset=1,limit=1';
        jQuery('.content .more').fadeOut();
        jQuery.ajax({
            url: "/ajax.php",
            data: data,
            success: function success(result) {
                jQuery(".content .row").animate({opacity: 0}, 500, function () {
                    jQuery(".content .row").html(result);
                    jQuery(".content .row").animate({opacity: 1}, 500);
                });
            }
        });
    });
}

function bodyClass(name) {
    return jQuery('body').hasClass(name);
}

jQuery(window).on("load", function () {
    header.mobile();
    upButton.controller();
    addCart();
    jQuery('.sidebar .menu-select a').click(function (e) {
        e.preventDefault();
        if (!jQuery(this).hasClass('active')) {
            jQuery('.sidebar .menu-select .active').removeClass('active');
            jQuery(this).addClass('active');
            var target = jQuery('.sidebar .menu:not(".active")');
            jQuery('.sidebar .menu.active').fadeOut(function () {
                jQuery(this).removeClass('active');
                jQuery(target).fadeIn().addClass('active');
            });
        }
    });

    if (bodyClass('home-page')) {
        jQuery(".slide").swipe({

            swipe: function swipe(event, direction, distance, duration, fingerCount, fingerData) {

                if (direction == 'left') jQuery(this).carousel('next');
                if (direction == 'right') jQuery(this).carousel('prev');
            },
            allowPageScroll: "vertical"

        });
    }
    if (bodyClass('product-page')) {
        jQuery('.album .small .photo').click(function () {
            var src = jQuery(this).find('img').attr('src');
            if (jQuery('.album .photo-big').attr('src') !== src) {
                jQuery('.small .active').removeClass('active');
                jQuery(this).addClass('active');
                jQuery('.album .photo-big').fadeOut(200, function () {
                    jQuery(this).attr('src', src).fadeIn(200);
                });
            }
        });
        productCounter();
    }
    if (bodyClass('cart-page')) {
        productCounter();
        delivery.controller();
        jQuery("#billing_phone").inputmask("+7(999)999-99-99");
        jQuery('.checkout-section .button').click(function (e) {
            let response = grecaptcha.getResponse();
            if (response.length === 0) e.preventDefault();
        });
        $(document.body).on('checkout_error', function () {
            $('strong:contains(Оплата)').filter(function () {
                return $(this).children().length === 0;  // exclude divs with children
            }).text(function (index, text) {
                return text.replace(/Оплата/g, '');
            });
        });
    }
    if (bodyClass('catalog-page')) {
        catalogView();
    }
    if (bodyClass('catalog-page')) {
        catalogView();
    }
    if (bodyClass('news-page')) {
        ajaxNews();
    }
    if (bodyClass('school-page')) {
        school.catalogPage();
    }
    if (bodyClass('course-page')) {
        school.singlePage();
    }
    if (bodyClass('promotion-page')) {
        promotion();
    }
    if (bodyClass('product-page')) {
        if (jQuery('.product').hasClass('variable')) {
            variableProduct.controller();
        }
        window.history.replaceState(null, null, window.location.pathname);
    }
    if (bodyClass('contacts-page')) {
        contactsMap();
    }
});