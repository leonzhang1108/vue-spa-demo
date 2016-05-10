/**
 * Created by leon on 2016/4/20.
 */

'use strict'
var Vue = require('vue')
var $ = require('jquery')
var Util = require('./util.js')

var ES = Util
ES.ui = {}
ES.ui.count = 0
ES.ui.comps = {}
ES.ui.remove = function (id) {
    ES.ui.comps[id] = undefined
    ES.ui.comps[id] = null
    delete ES.ui.comps[id]
}
ES.ui.get = function (id) {
    return ES.ui.comps[id]
}
ES.ui.add = function (id, value) {
    ES.ui.comps[id] = value
}
ES.ui.get_id = function (id) {
    if (!id) {
        id = 'ESui-' + ES.ui.count
        ES.ui.count++
    }
    return id
}
ES.ui.affix = function (fix_pos, fix_comp, max_top) {
    var intveral = null
    var time_span = 100
    var scroll = function () {
        var top_max = fix_pos.offset().top
        var top = max_top()
        var pos = 'fixed'
        if (top >= top_max) {
            pos = 'static'
        }
        var c = fix_comp
        var c_pos = c.css('position')
        if (c_pos != pos) {
            c.hide().css({
                'position': pos
            }).fadeIn(200)
        }
        clearTimeout(intveral)
        intveral = null
    }
    ES.get(window).scroll(function () {
        if (intveral != null) {
            clearTimeout(intveral)
            intveral = null
        }
        intveral = setTimeout(scroll, time_span)
    })
}
ES.ui.unmask = function () {
    $('.shadow').remove()
}
ES.ui.mask = function (config) {
    config = config || {}
    if (!config.multi && $('.shadow').length > 0) {
        return
    }
    var mask = '<div class="shadow"><i class="fa fa-refrESh fa-spin"></i></div>'
    if (!config.ele) {
        mask = $(mask)
        mask.css({
            'line-height': $('body').height() + 'px'
        })
        $('body').append(mask)
    } else if (config.only) {
        var ele = $(config.ele)
        var top = ele.offset().top
        var height = ele.height()
        var mask1 = $(mask)
        var mask2 = $(mask)
        mask1.css({
            'position': 'absolute',
            'top': '0px',
            'height': top + 'px'
        });
        mask2.css({
            'position': 'absolute',
            'top': (top + height) + 'px',
            'height': ($('body').height() - top - height) + 'px'
        });
        ele.append(mask1).append(mask2)
    } else {
        var ele = $(config.ele)
        mask = $(mask)
        var left = ele.offset().left
        var top = ele.offset().top
        var width = ele.width()
        var height = ele.height()
        mask.css({
            'position': 'absolute',
            'top': top + 'px',
            'left': left + 'px',
            'width': width + 'px',
            'height': height + 'px',
            'line-height': height + 'px'
        })
        ele.append(mask)
    }
}

ES.ui.popup = function (config) {
    config = config || {}
    config = ES.util.merge({
        title: ES.msg.get('default_title'),
        auto_hide_default: true,
        close: true,
        center: true
    }, config)
    var render = function () {
        $('.popup').remove()
        var minHeight = ES.client_height - 70
        var minWidth = 300
        var top = (ES.client_height - minHeight) / 2 - 10
        var left = (ES.client_width - minWidth) / 2
        var div = $('<div class="popup"><div class="popup-title"></div><div class="clear"></div></div>')
        var time_out
        if (!config.title) {
            config.title = "&nbsp;"
        }
        div.children('.popup-title').html(config.title)
        if (config.close) {
            if (!config.closEStyle) {
                config.closEStyle = ''
            }
            div.children('.popup-title').append('<a href="javascript:void(0);" class="popup-close"><i class="fa fa-remove"></i></a>')
        }
        if (!config.auto_hide && config.auto_hide_default && !config.hide_buttons) {
            config.innerHTML += '<div class="popup-btn">' +
                '<div style="margin:auto;float: none;"><a href="javascript:void(0);" class="btn btn-major btn-close">' + ES.msg.get('close') + '</a></div></div>'
        }
        if (config.innerHTML) {
            div.append($('<div class="popup-content">' + config.innerHTML + '</div>'))
        }
        div.css({
            'top': top + "px",
            'left': left + "px",
            'min-width': minWidth + 'px'
        })
        if (config.css) {
            div.css(config.css)
        }
        ES.ui.mask()
        var close_func = function (e) {
            if (time_out) {
                clearTimeout(time_out)
            }
            if (config.before_callback) {
                var rESult = config.before_callback()
                if (!rESult) {
                    return
                }
            }

            if (config.after_callback) {
                config.after_callback()
            }
            $(document).trigger('click')
            $('.popup').remove()
            ES.ui.unmask()
            if (config.after_close) {
                config.after_close()
            }
            e.preventDefault()
            return false
        }
        $('body').append(div)
        if (config.before_show) {
            config.before_show()
        }
        if (config.close) {
            $('.popup-close').click(close_func)
        }
        if (!config.auto_hide) {
            $('.popup .popup-btn .btn-close').click(close_func)
        }
        if (config.callback) {
            $('.popup').show(function () {
                config.callback()
            });
        } else {
            $('.popup').show()
        }
        var width = $('.popup').width()
        if (config.center) {
            var popup = $('.popup')
            var height = popup.height()
            popup.css({
                top: ((ES.client_height - height) / 2) + 'px',
                left: ((ES.client_width - width) / 2) + 'px'
            })
        }
        if (config.auto_hide) {
            time_out = setTimeout(function () {
                $('.popup').remove()
                ES.ui.unmask()
            }, 2000);
        }
        var pop = $('.popup')
        pop.data('value', width)
        $('.popup-title').bind("mousedown", function (event) {
            var offset_x = $('.popup')[0].offsetLeft
            var offset_y = $('.popup')[0].offsetTop
            var mouse_x = event.pageX
            var mouse_y = event.pageY

            $(document).bind("mousemove", function (ev) {
                var _x = ev.pageX - mouse_x
                var _y = ev.pageY - mouse_y
                var now_x = (offset_x + _x ) + "px"
                var now_y = (offset_y + _y ) + "px"
                pop.css({
                    top: now_y,
                    left: now_x
                })
            })
        })
        $(document).bind("mouseup", function () {
            $(document).unbind("mousemove");
        })
        $('.popup-title').dblclick(function () {
            var pop = $('.popup')
            var w = pop.outerWidth()
            if (w <= ES.client_width) {
                pop.css({
                    top: 0,
                    left: 0,
                    width: ES.client_width,
                    height: ES.client_height
                })
            } else {
                w = pop.data('value')
                pop.css({
                    width: w,
                    height: 'auto'
                })
                ES.ui.popup.auto_position()
            }
        })
    }
    render();
}
ES.ui.popup.auto_position = function () {
    var div = $('.popup')
    if (div.length <= 0) {
        return
    }
    ES.client_height = document.documentElement.clientHeight
    ES.client_width = document.documentElement.clientWidth

    var height = div.outerHeight()
    var width = div.outerWidth()

    var top = (ES.client_height - height) / 2 - 10
    var left = (ES.client_width - width) / 2

    if (top < 0) {
        top = 0
    }

    div.css({
        'top': top + "px",
        'left': left + "px"
    })
    div.data('value', width)
    var popup_common = div.find('.popup-content')
    if (popup_common && popup_common.length > 0) {
        if (ES.client_height < height) {
            popup_common.css('max-height', (height - 70) + 'px')
            popup_common.css('height', (ES.client_height - 70) + 'px')
        }
    }
}
ES.ui.confirm = function (config, succESs, fail) {
    config = config || {}
    config = ES.util.merge({
        innerHTML: ''
    }, config)

    config.positiveBtnDisplay = config.positiveBtnDisplay || 'inline-block'

    var positiveBtnMsg = config.positiveBtnMsg || ES.msg.get('confirm')
    var cancelBtnMsg = config.cancelBtnMsg || ES.msg.get('cancel')

    config.innerHTML = '<div class="popup-common">' + config.innerHTML + '</div><div class="clear"></div><div class="main-popup-error" style="display: none"><div class="popup-error"></div><div class="popup-warn"></div></div><div class="clear"></div><div class="popup-btn">' +
        '<span style="margin-right: 8px;"><a href="javascript:void(0);" class="btn btn-reverse">' + cancelBtnMsg + '</a></span>' +
        '<span><a href="javascript:void(0);" class="btn btn-major" style="display: ' + config.positiveBtnDisplay + ';">' + positiveBtnMsg + '</a></span><div class="clear"></div></div>'
    config.auto_hide = false
    config.auto_hide_default = false
    var ret = ES.ui.popup(config)
    if (succESs) {
        $('.popup .popup-btn .btn-major').click(function (e) {
            if (!succESs()) {
                return
            }
            $('.popup').remove()
            ES.ui.unmask()
            e.preventDefault()
            return false
        })
    }
    $('.popup .popup-btn .btn-reverse').click(function (e) {
        if (fail && !fail()) {
            return
        }

        $('.popup').remove()
        ES.ui.unmask()
        e.preventDefault()
        return false
    })
    return ret
}
ES.ui.alert = function (config, isHyperlink) {
    config = config || {}
    config = ES.util.merge({
        title: ES.msg.get('default_title'),
        auto_hide: true
    }, config)
    var key = config.key
    var arg = config.arg
    var msg = ES.msg.get(key, arg)
    var cls = ''
    var auto_hide = config.auto_hide
    if (config.type == 'error') {
        cls = 'class="error"'
        auto_hide = false
    }
    if (isHyperlink) {
        var mESsage = '<p ' + cls + '><a href="' + ES.deploy + config.hyperlink + '">' + msg + '</a></p>'
    } else {
        var mESsage = '<p ' + cls + '>' + msg + '</p>'
    }

    ES.ui.popup({
        after_close: config.after_close,
        after_callback: config.after_callback,
        callback: config.callback,
        title: config.title,
        auto_hide: auto_hide,
        innerHTML: mESsage
    })
}

//ES.ui.input = function (config) {
//    var ret = new Vue({
//        el: '#' + config.el,
//        data: {
//            message: 'Hello Vue.js!'
//        }
//    })
//    ES.ui.add(ret.id, ret)
//    return ret
//}

ES.ui.input = function (config) {
    var ES_input = function (conf) {
        conf = conf || {}
        if (!conf.el) {
            return
        }
        var id = '#' + conf.el
        var el = $(id)
        // 中文显示
        var configCn = {
            dateFormat: 'yy-mm-dd',
            yearSuffix: '年',
            monthNamES: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            dayNamES: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            dayNamESShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            dayNamESMin: ['日', '一', '二', '三', '四', '五', '六']
        }
        if (ES.lang === 'zh-cn') {
            conf = ES.util.merge(conf, configCn)
        }
        if (el.hasClass('date')) {
            conf.dateFormat = "yy-mm-dd"
            //conf.changeMonth=true
            //conf.changeYear=true
            el.datepicker(conf)
        }
        if (el.hasClass('datemonth')) {
            conf = ES.util.merge(conf, {
                monthNamES: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                monthNamESShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                changeMonth: true,
                changeYear: true,
                showButtonPanel: true,
                dateFormat: 'yy-MM',
                onClose: function (dateText, inst) {
                    var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                    var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                    $(this).datepicker('setDate', new Date(year, month, 1));
                }
            })
            el.datepicker(conf)
        }
        if (el.hasClass('datetime')) {
            conf = ES.util.merge(conf, {
                dateFormat: "yy-mm-dd",
                timeText: ES.msg.get('timepicker_timeText'),
                hourText: ES.msg.get('timepicker_hourText'),
                minuteText: ES.msg.get('timepicker_minuteText'),
                //secondText: ES.msg.get('timepicker_secondText'),
                closeText: ES.msg.get('timepicker_closeText'),
                currentText: ES.msg.get('timepicker_currentText'),
                timeInput: true,
                timeFormat: "HH:mm:00",
                showHour: false,
                showMinute: false
            })
            el.datetimepicker(conf)
        }

        if (el.attr('type') != 'hidden') {
            var nonempty = conf.nonempty ? conf.nonempty : false
            var value = conf.value ? conf.value : ''
            var readonly = conf.readonly
            var label = conf.label
            var after_labels = conf.after_labels
            var after_button = conf.after_button
            var max_l = conf.max_l ? conf.max_l : 255
            var min_l = conf.min_l ? conf.min_l : 4
            if (el.hasClass('number')) {
                max_l = 15
                min_l = 1
            }
            var icon = conf.icon ? ES.util.format_string(ES.tpl.icon_tpl, {
                cls: conf.icon + ' input-icon'
            }) : ''
            var cls = conf.cls ? conf.cls : ''
            if (!config.placeholder) {
                config.placeholder = ''
            }
            if (!config.msg) {
                config.msg = ES.msg.get('non_empty')
            }
            el.wrap("<div class='wrap input-wrap " + cls + "'></div>").attr('maxlength', max_l).attr('minlength', min_l).attr('placeholder', config.placeholder)
            var parent = el.parent()
            if (value) {
                el.val(value)
            }
            if (readonly) {
                el.attr('readonly', 'true')
            }
            if (icon) {
                parent.prepend(icon)
            } else {
                el.css({
                    'padding-left': '10px'
                })
            }
            if (label) {
                if (nonempty) {
                    label = '<span class="nonempty">*</span>' + label
                }
                if (el.attr('type') != 'checkbox' && el.attr('type') != 'radio') {
                    parent.prepend(ES.util.format_string(ES.tpl.label_tpl, {
                        display: label,
                        id: conf.el
                    }))
                } else {
                    parent.append(ES.util.format_string(ES.tpl.label_tpl, {
                        display: label,
                        id: conf.el
                    }))
                }
            }
            if (after_labels) {
                ES.each(after_labels, function (_, v) {
                    parent.append('<span class="input-content">' + v + '</span>')
                })
            }

            if (after_button && !$.isEmptyObject(after_button)) {
                after_button = [].concat(after_button)
                for (var i = 0; i < after_button.length; i++) {
                    parent.append('<a id=' + after_button[i].el + ' style="margin-left:10px"></a>')
                    ES.ui.button(after_button[i])
                }
            }

            parent.append('<span class="msg"></span>')
            this.nonempty = nonempty
            this.msg = config.msg
            this.msg_type = config.msg_type
            this.customer_validate = conf.validate
            this.mask = conf.mask
            this.default_value = config.default_value
            this.validate = function () {
                this.clear_invalid()
                var rESult = true
                if (!this.get_value()) {
                    if (el.hasClass('number')) {
                        if (this.nonempty && this.el.val() == '') {
                            this.set_msg(this.msg)
                            rESult = false
                        }
                        /*else if(this.el.val()!='' && this.get_value()== 0){
                         this.set_msg(config.default_number_msg || ES.msg.get('more_than_zero'))
                         rESult = false
                         }*/
                    } else if (this.nonempty) {
                        this.set_msg(this.msg)
                        rESult = false
                    }
                }
                if (rESult && this.get_value() && this.mask) {
                    var v = this.get_value()
                    var mask = this.mask
                    var reg = mask.reg || mask
                    if (!reg.tESt(v)) {
                        if (mask.msg) {
                            this.set_msg(mask.msg)
                        } else {
                            this.set_msg(ES.msg.error_regex)
                        }
                    } else {
                        this.clear_invalid()
                    }
                    rESult = reg.tESt(v)
                }
                if (rESult && this.customer_validate) {
                    rESult = this.customer_validate()
                }
                return rESult
            }
            el.on('change', function (e) {
                var v = $(this).val()
                var _input = ES.ui.get(e.target.id)
                var comp = _input.mask
                if (comp) {
                    var reg = comp.reg || comp
                    if (!reg.tESt(v)) {
                        /**
                         var def = comp.default_value ? comp.default_value : ''
                         $(this).val(def)
                         **/
                        if (comp.msg) {
                            _input.set_msg(comp.msg)
                        } else {
                            _input.set_msg(ES.msg.error_regex)
                        }
                        e.preventDefault()
                    } else {
                        _input.clear_invalid()
                    }
                }
            })
        } else {
            // hidden field always return true when validating
            this.validate = function () {
                return true
            }
        }
        this.id = conf.el
        this.el = el
        this.etype = 'input'

        // number field
        if (el.hasClass('number')) {
            this.get_value = function () {
                var v = this.el.val()
                return $.isNumeric(v) ? +v : 0
            }
            el.on('change', function () {
                var v = $(this).val()
                if (!$.isNumeric(v)) {
                    v = 0
                    $(this).val(v)
                }
            })
        } else {
            if (el.hasClass('date') || el.hasClass('datetime')) {
                el.on('change', function () {
                    var v = $(this).val()
                    var reg = /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s((([0-1][0-9])|(2?[0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/
                    //判断日期格式
                    if (!reg.tESt(v)) {
                        $(this).val('')
                        return
                    }
                    //判断minDate maxDate v 是否在该区间
                    var minDate = $(this).datepicker('option', 'minDate')
                    var maxDate = $(this).datepicker('option', 'maxDate')
                    if (!ES.util.judge_date_interval(minDate, maxDate, v, el.hasClass('date'))) {
                        $(this).val('')
                    }
                    if (el.hasClass('date')) {
                        var formatedDate = $.datepicker.formatDate(
                            $(this).datepicker('option', 'dateFormat'),
                            $(this).datepicker('getDate')
                        )
                        $(this).val(formatedDate)
                    }
                })
            }
            this.get_value = function () {
                if (this.el[0].type == 'checkbox') {
                    return this.el.prop('checked')
                } else {
                    var v = this.el.val()
                    if (v) {
                        v = v.trim()
                    }
                    return v
                }
            }
        }
        this.set_value = function (v) {
            return this.el.val(ES.util.xssunEScape(v))
        }
        this.set_nonempty = function (nonempty) {
            var label = this.el.closESt('.input-wrap').find('label')
            if (label) {
                this.nonempty = nonempty
                if (nonempty) {
                    label.prepend('<span class="nonempty">*</span>')
                } else {
                    label.find('span').remove()
                }
            }
        }
        this.clear_invalid = function () {
            var tip_msg = this.el.closest('div').find('.msg-tip')
            if (tip_msg.length > 0) {
                tip_msg.remove()
            }
            var error_style = config.msg_style || 'error'
            this.el.removeClass('ES-input-invalid')
            this.el.removeClass(error_style + '_frame')
            ES.get('.main-popup-error').hide().children().hide()
            function findMsg(el) {
                if (el.parent().children('.msg').length == 0) {
                    findMsg(el.parent())
                } else {
                    el.parent().children('.msg').empty().removeClass('error').hide()
                }
            }

            if (el.attr('type') != 'hidden') {
                findMsg(this.el)
            }

        }
        this.set_msg = function (msg) {
            this.msg = msg
            if (this.msg_type && this.msg_type == 'tips') {
                var tips = '<div class="msg-tip error">' + msg + '</div>'
                ES.get(tips).insertBefore(this.el)
            } else if (this.msg_type && this.msg_type == 'popup-tips') {
                //错误类型 默认error warn
                var error_style = config.msg_style || 'error'
                var i_cls = 'fa-timES-circle'
                switch (error_style) {
                    case 'warn':
                        i_cls = 'fa-exclamation-circle'
                        break;
                    default:
                        break;
                }
                ES.get('.main-popup-error').children().hide()
                ES.get('.main-popup-error').show().find('.popup-' + error_style).html('<i class="fa ' + i_cls + '"></i> ' + msg).show()
                ES.get('#' + this.id).addClass(error_style + '_frame')
            } else {
                function findMsg(el) {
                    if (el.parent().children('.msg').length == 0) {
                        findMsg(el.parent())
                    } else {
                        el.parent().children('.msg').addClass('error').html('<i class="fa ' + i_cls + '"></i> ' + msg).show()
                    }
                }

                if (el.attr('type') != 'hidden') {
                    findMsg(this.el)
                }
            }
        }
        this.disable = function () {
            if (this.el.attr('type') == 'checkbox') {
                this.el.addClass('disabled').prop('disabled', true)
            } else {
                this.el.addClass('disabled').attr('readonly', true)
            }

        }
        this.enable = function () {
            this.el.removeClass('disabled').attr('readonly', false)
        }
        this.clear_value = function () {
            this.el.val('')
            return this
        }
        this.show = function () {
            this.el.parent().show()
        }
        this.hide = function () {
            this.el.parent().hide()
        }
    }
    var ret = new ES_input(config)
    ES.ui.add(ret.id, ret)
    return ret
}


ES.ui.select = function (config) {
    var ret = ES.ui.input(config)
    ret.bind_list = function (list) {
        this._list = list
        var out = []
        for (var i = 0, l = list.length; i < l; i++) {
            out.push(ES.util.format_string(ES.tpl.option_tpl, list[i]))
        }
        this.el.append(out.join(''))
        return this
    }
    ret.clear_list = function () {
        this.el.empty()
    }
    ret.set_display_value = function (v) {
        return this.el.val(v)
    }
    ret.get_display_value = function () {
        return ES.get('#' + config.el + ' option:selected').text()
    }
    if (config.disable) {
        ret.el.attr('disabled', true)
    }
    ret.etype = 'select'
    ES.ui.add(ret.id, ret)
    return ret
}


ES.ui.file = function (config) {
    var ret = ES.ui.input(config)
    var id = '#' + config.el
    var el = $(id)
    el.wrap("<a href='javascript:;' class='file-upload'></a>")
    var parent = el.parent()
    var label = '<span class="upload_file">' + config.placeholder + '</span>'
    parent.prepend(label)

    ret.clear_value = function () {
        ret.el.val('')
        ret.el.parent().find('.upload_file').html('点击上传文件')
    }
    return ret
}
ES.ui.input_date_input = function (config) {
    config.cls = "input_date_input"
    var from_ret = ES.ui.input(config)
    var toInput = ES.get('<input type="text" name="' + config.toName + '" id="toDate-' + config.toName + '" class="date" style="padding-left: 10px;"/>')
    toInput.insertAfter(from_ret.el.next())

    config.dateFormat = "yy-mm-dd"
    // 中文显示
    var configCn = {
        dateFormat: 'yy-mm-dd',
        yearSuffix: '年',
        monthNamES: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        dayNamES: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamESShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        dayNamESMin: ['日', '一', '二', '三', '四', '五', '六']
    }
    if (ES.lang === 'zh-cn') {
        config = ES.util.merge(config, configCn)
    }
    var minDate = config.minDate
    var maxDate = config.maxDate
    from_ret.el.datepicker(config).addClass('input-date-from')
    toInput.datepicker(config).addClass('input-date-to')

    var change_input_date = function () {
        var v = $(this).val()
        var reg = /^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/
        //判断日期格式
        if (!reg.tESt(v)) {
            $(this).val('')
            return
        }
        //判断minDate maxDate v 是否在该区间
        if (!ES.util.judge_date_interval(minDate, maxDate, v, true)) {
            $(this).val('')
        }
    }

    from_ret.el.on('change', change_input_date)
    toInput.on('change', change_input_date)

    var from_key = from_ret.el.attr('name') || from_ret.el.attr('id')
    var to_key = toInput.attr('name') || toInput.attr('id')

    from_ret.get_value = function () {
        if (from_ret.nonempty && from_ret.el.val() == '' && toInput.val() == '') {
            return ''
        } else {
            var valueObj = {}
            valueObj[from_key] = from_ret.el.val()
            valueObj[to_key] = toInput.val()
            return valueObj
        }

    }
    from_ret.set_value = function (val) {
        from_ret.el.val(val[from_key])
        toInput.val(val[to_key])
    }
    from_ret.clear_value = function () {
        toInput.val('')
        return from_ret.el.val('')
    }
    from_ret.disable = function () {
        from_ret.el.addClass('disabled').attr('readonly', true)
        toInput.addClass('disabled').attr('readonly', true)
    }
    from_ret.enable = function () {
        from_ret.el.removeClass('disabled').attr('readonly', false)
        toInput.removeClass('disabled').attr('readonly', false)
    }
    from_ret.set_msg = function (msg) {
        config.msg = msg
        if (config.msg_type && config.msg_type == 'tips') {
            if (from_ret.el.val() == '') {
                var tips = '<div class="msg-tip error">' + msg + '</div>'
                ES.get(tips).insertBefore(from_ret.el)
            }
            if (toInput.val() == '') {
                var tips = ES.get('<div class="msg-tip error">' + msg + '</div>')
                tips.insertBefore(toInput)
                var marginLeft = tips.css('marginLeft').split('px')[0] * 1 + from_ret.el.outerWidth() * 1
                var marginTop = tips.css('marginTop').split('px')[0] * 1 - toInput.outerHeight() * 1
                tips.css('marginLeft', marginLeft + 'px')
                tips.css({
                    'marginLeft': +marginLeft + 90 + 'px',
                    'marginTop': marginTop + 'px',
                })
            }

        }

    }
    from_ret.validate = function () {
        from_ret.clear_invalid()
        var rESult = true
        if (!from_ret.get_value() || toInput.val() == '') {
            if (from_ret.nonempty) {
                from_ret.set_msg(from_ret.msg)
                rESult = false
            }
        }
        if (rESult && from_ret.customer_validate) {
            rESult = from_ret.customer_validate()
        }
        return rESult
    }

    from_ret.etype = 'input_date_input'
    ES.ui.add(from_ret.id, from_ret)
    return from_ret
}

ES.ui.input_year_month = function (config) {
    config.cls = "input_year_month"
    var from_ret = ES.ui.select(config)
    var toInput = ES.get('<select name="' + config.toName + '" id="toDate-' + config.toName + '" style="padding-left: 10px;"></select>')
    toInput.insertAfter(from_ret.el.next())

    var yearList = []
    for (var y = 2010; y <= 2020; y++) {
        yearList.push({
            display: y + '年',
            value: y
        })
    }
    from_ret.bind_list(yearList)

    var monthList = []
    for (var y = 1; y <= 12; y++) {
        monthList.push({
            display: y < 10 ? '0' + y + '月' : y + '月',
            value: y < 10 ? '0' + y : y
        })
    }
    var out = []
    for (var i = 0, l = monthList.length; i < l; i++) {
        out.push(ES.util.format_string(ES.tpl.option_tpl, monthList[i]))
    }
    toInput.append(out.join(''))


    var from_key = from_ret.el.attr('name') || from_ret.el.attr('id')
    var to_key = toInput.attr('name') || toInput.attr('id')

    from_ret.get_value = function () {
        if (from_ret.nonempty && from_ret.el.val() == '' && toInput.val() == '') {
            return ''
        } else {
            var valueObj = {}
            valueObj[from_key] = from_ret.el.val()
            valueObj[to_key] = toInput.val()
            return valueObj
        }

    }
    from_ret.set_value = function (val) {
        from_ret.el.val(val[from_key])
        toInput.val(val[to_key])
    }
    from_ret.clear_value = function () {
        toInput.val('')
        return from_ret.el.val('')
    }
    from_ret.disable = function () {
        from_ret.el.addClass('disabled').attr('readonly', true)
        toInput.addClass('disabled').attr('readonly', true)
    }
    from_ret.enable = function () {
        from_ret.el.removeClass('disabled').attr('readonly', false)
        toInput.removeClass('disabled').attr('readonly', false)
    }
    from_ret.set_msg = function (msg) {
        config.msg = msg
        if (config.msg_type && config.msg_type == 'tips') {
            if (from_ret.el.val() == '') {
                var tips = '<div class="msg-tip error">' + msg + '</div>'
                ES.get(tips).insertBefore(from_ret.el)
            }
            if (toInput.val() == '') {
                var tips = ES.get('<div class="msg-tip error">' + msg + '</div>')
                tips.insertBefore(toInput)
                var marginLeft = tips.css('marginLeft').split('px')[0] * 1 + from_ret.el.outerWidth() * 1
                var marginTop = tips.css('marginTop').split('px')[0] * 1 - toInput.outerHeight() * 1
                tips.css('marginLeft', marginLeft + 'px')
                tips.css({
                    'marginLeft': +marginLeft + 90 + 'px',
                    'marginTop': marginTop + 'px',
                })
            }
        }
    }
    from_ret.validate = function () {
        from_ret.clear_invalid()
        var rESult = true
        if (!from_ret.get_value() || toInput.val() == '') {
            if (from_ret.nonempty) {
                from_ret.set_msg(from_ret.msg)
                rESult = false
            }
        }
        if (rESult && from_ret.customer_validate) {
            rESult = from_ret.customer_validate()
        }
        return rESult
    }

    from_ret.etype = 'input_date_input'
    ES.ui.add(from_ret.id, from_ret)
    return from_ret
}


ES.ui.input_date_time = function (config) {
    var ret = ES.ui.input(config)
    config.dateFormat = "yy-mm-dd"
    // 中文显示
    var configCn = {
        dateFormat: 'yy-mm-dd',
        yearSuffix: '年',
        monthNamES: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        dayNamES: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamESShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        dayNamESMin: ['日', '一', '二', '三', '四', '五', '六']
    }
    if (ES.lang === 'zh-cn') {
        config = ES.util.merge(config, configCn)
    }
    ret.el.datepicker(config).addClass('input-date-time')
    ret.el.on('change', function () {
        var v = $(this).val()
        var reg = /^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/
        //判断日期格式
        if (!reg.tESt(v)) {
            $(this).val('')
            return
        }
        //判断minDate maxDate v 是否在该区间
        var minDate = $(this).datepicker('option', 'minDate')
        var maxDate = $(this).datepicker('option', 'maxDate')
        if (!ES.util.judge_date_interval(minDate, maxDate, v, true)) {
            $(this).val('')
        }
    })
    var time = ES.get('<select class="input-date-time input-time"></select>')
    var out = []
    for (var i = 0; i < 24; i++) {
        var d = i < 10 ? '0' + i : '' + i
        out.push(ES.util.format_string(ES.tpl.option_tpl, {
            display: d + ':00:00',
            value: d + ':00:00'
        }))
    }
    time.append(out.join('')).val('10:00:00').insertAfter(ret.el)
    ret.el_time = time
    ret.get_value = function () {
        if (this.el.val() == '') {
            return ''
        }
        else {
            return this.el.val() + ' ' + this.el_time.val()
        }
    }
    ret.set_value = function (v) {
        var arr = v.split(' ')
        this.el.val(arr[0])
        this.el_time.val(arr[1])
    }
    ret.disable = function () {
        this.el.addClass('disabled').attr('readonly', true)
        this.el_time.addClass('disabled').attr('readonly', true)
    }
    ret.enable = function () {
        this.el.removeClass('disabled').attr('readonly', false)
        this.el_time.removeClass('disabled').attr('readonly', false)
    }

    if (config.no_default_time) {
        ret.set_value('')
    }

    ret.etype = 'input_date_time'
    ES.ui.add(ret.id, ret)
    return ret
}


ES.ui.input_time = function (config) {
    var hour = ES.ui.select(config)
    var out = []
    for (var i = 0; i < 24; i++) {
        var d = i < 10 ? '0' + i : '' + i
        out.push({
            display: d,
            value: d
        })
    }
    hour.bind_list(out)

    var init_minute_second = function (item) {
        for (var i = 0; i < 60; i++) {
            var d = i < 10 ? '0' + i : '' + i
            out.push(ES.util.format_string(ES.tpl.option_tpl, {
                display: d,
                value: d
            }))
        }
        item.append(out.join('')).insertAfter(hour.el)
    }
    var second = ES.get('<select class="input-time-second"></select>')
    var minute = ES.get('<select class="input-time-minute"></select>')
    init_minute_second(second)
    init_minute_second(minute)

    hour.el.on('change', function () {
        if (!minute.val()) {
            minute.val('00')
        }
        if (!second.val()) {
            second.val('00')
        }
    })
    hour.set_value = function (time) {
        var insertTime = time.split(':')
        hour.el.val(insertTime[0])
        minute.val(insertTime[1])
        second.val(insertTime[2])
    }
    hour.get_value = function () {
        if (hour.el.val() && minute.val() && second.val()) {
            return hour.el.val() + ':' + minute.val() + ':' + second.val()
        } else {
            return ''
        }
    }
    hour.el.css({width: '20%'})
    minute.css({width: '20%'}).val('')
    second.css({width: '20%'}).val('')
    hour.clear_value()
    return hour
}

$(document).on('click', function (e) {
    var obj = $(e.srcElement || e.target);
    $('.input-drop').each(function () {
        if ($(this).is(":visible") && !$(obj).is(".input-drop *")) {
            var item
            if ($('#' + $(this).data('value')).val() && $(this).children('div.input-port-item-selected').length > 0) {
                item = $(this).children('div.input-port-item-selected').eq(0)
                if (item.length > 0) {
                    $('#' + $(this).data('value')).val('').data('value', '')
                    item.trigger('click')
                }
            } else if ($('#' + $(this).data('value')).val()) {
                item = $(this).children('div').eq(0)
                if (item.length > 0) {
                    $('#' + $(this).data('value')).val('').data('value', '')
                    item.trigger('click')
                }
            }
            $(this).hide()
        }
    })
    $('.power-geo-drop').each(function () {
        if ($(this).is(":visible") && !$(obj).is(".power-geo-drop *")) {
            // if($(this).children('div.input-port-item-selected')){
            // 	$(this).children('div.input-port-item-selected').eq(0).trigger('click')
            // }
            $(this).hide()
        }
    })
})

/**
 *带[港口信息]输入联想的input
 * @param  config  控件设置项对象
 * @param  {String} config.module  港口信息区分[内贸整箱、外贸整箱、外贸拼箱]---both:全部；DomESticShippingSpu:内贸；ForeignTrunkSpu:外贸；LclSpu:拼箱
 * @param  {String} config.type  标识起始港还是目的港---from:查找起始港港口；to:查找目的港港口
 * @param  {String} config.param 其他参数
 */
ES.ui.input_port = function (config) {
    var ret = ES.ui.input(config)
    ret.param = config.param ? config.param : {}
    ret.get_value = function () {
        return this.el.data('value') ? this.el.data('value') : ''
    }
    ret.get_display_value = function () {
        return this.el.val()
    }
    ret.set_display_value = function (val) {
        return this.el.val(val)
    }
    ret.set_value = function (val) {
        var g = this
        var find_geo_callback = function (rES) {
            if (rES.ports.length <= 0) {
                return
            }
            rES = rES.ports[0]
            if (ES.lang == 'en-us') {
                g.el.val(rES.nameEn)
            } else {
                g.el.val(rES.name)
            }
        }
        ES.util.ajax_get('/geo/find_port_by_code', {
            code: val
        }, find_geo_callback)
        return this.el.data('value', val)
    }
    ret.clear_value = function () {
        return this.el.val('').data('value', '')
    }
    ret.set_preference = function (list) {
        this.preference = list
    }
    var table = $('<div class="input-drop input-port-drop" data-value="' + ret.id + '" id="' + ret.id + '-drop"></div>')
    $('body').append(table)
    var type = config.type
    var related = config.related
    var module = config.module
    var both = config.module == 'both'
    var filter_geo = function (value) {
        var input = $(this)
        var inputValue = input.val()
        var drop = $('#' + input.attr('id') + '-drop')
        if (!inputValue) {
            inputValue = ''
        }

        var ws = '/port/query'
        if ('from' == type) {
            if (both) {
                ws = '/port/query_both_from_port'
            } else {
                ws = '/port/query_from_port'
            }
        } else if ('to' == type) {
            if (both) {
                ws = '/port/query_both_to_port'
            } else {
                ws = '/port/query_to_port'
            }
        }
        if (config.dataUrl) {
            ws = config.dataUrl;
        }
        var port = ''
        if (related && ES.ui.get(related)) {
            port = ES.ui.get(related).get_value()
        }
        var width = input.outerWidth() - 22
        width = width <= 200 ? 200 : width
        var height = input.outerHeight()
        var offset = input.offset()
        var poupFlag = input.closESt('.popup').length > 0 ? true : false
        var infactTop = offset.top + height
        if (poupFlag) {
            infactTop = infactTop - $(document).scrollTop()
        }
        drop.css({
            top: infactTop,
            left: offset.left,
            'min-width': width,
            'position': poupFlag ? 'fixed' : 'absolute'
        })
        drop.empty().html('<div class="input-port-item" data-value="-1">' + ES.msg.get('loading') + '</div>').show()
        var reqData = ES.util.merge({
            q: inputValue,
            port: port,
            type: module
        }, ret.param)
        ES.util.ajax_get(ws, reqData, function (rES) {
            var out = []
            var selected = false
            var preference = ES.ui.get(input.attr('id')).preference
            if (preference) {
                out.push('<div class="input-port-sep" data-value="-1">' + ES.msg.get('preference') + '</div>')
                ES.each(preference, function (_, v) {
                    if (ES.lang == 'en-us') {
                        out.push('<div class="input-port-item " data-value="' + v.code + '" data-type="' + v.type + '">' +
                            '<span style="float:right">' + v.code + '</span><span class="port-name">' + v.nameEn + '</div>')
                    } else {
                        out.push('<div class="input-port-item " data-value="' + v.code + '" data-type="' + v.type + '">' +
                            '<span style="float:right">' + v.code + '</span><span class="port-name">' + v.name + '</span> - ' + v.nameEn + '</div>')
                    }
                })
            }
            if (!rES.ports || rES.ports.length <= 0) {
                out.push('<div class="input-port-item" data-value="-1">' + ES.msg.get('default_empty_rESult') + '</div>')
                input.data('value', '')
            } else {
                var filter = {}
                var ports = rES.ports
                ES.each(ports, function (_, v) {
                    filter[v.code] = v
                })
                var t_p = []
                for (var p in filter) {
                    if (filter.hasOwnProperty(p)) {
                        t_p.push(filter[p])
                    }
                }
                t_p.sort(function (a, b) {
                    return a.nameEn > b.nameEn ? 1 : -1
                })
                var group = t_p[0].nameEn[0]
                // not display group title
                // out.push('<div class="input-port-sep" data-value="-1">' + group + '</div>')
                ES.each(t_p, function (_, v) {
                    if (group != v.nameEn[0]) {
                        group = v.nameEn[0]
                        // not display group title
                        // out.push('<div class="input-port-sep" data-value="-1">' + group + '</div>')
                    }
                    var cls = ''
                    v.type = v.type ? v.type : ''
                    if (input.val() == v.name || input.val() == v.nameEn || input.val() == v.code) {
                        cls = 'input-port-item-selected'
                        input.data('value', v.code).data('type', v.type)
                        selected = true
                    }
                    if (ES.lang == 'en-us') {
                        out.push('<div class="input-port-item ' + cls + '" data-value="' + v.code + '" data-type="' + v.type + '">' +
                            '<span style="float:right">' + v.code + '</span><span class="port-name">' + v.nameEn + '</div>')
                    } else {
                        out.push('<div class="input-port-item ' + cls + '" data-value="' + v.code + '" data-type="' + v.type + '">' +
                            '<span style="float:right">' + v.code + '</span><span class="port-name">' + v.name + '</span> - ' + v.nameEn + '</div>')
                    }
                })
            }
            drop.empty().html(out.join('')).show()
            if (!selected) {
                drop.children('div.input-port-item').eq(0).addClass('input-port-item-selected')
                if (inputValue) {
                    input.data('value', drop.children('div.input-port-item').eq(0).data().value).data('type', drop.children('div.input-port-item').eq(0).data().type)
                }
            }
            drop.children('div.input-port-item').on('click', function (e) {
                var v = $(this)
                var tar = $('#' + v.parent().data().value).val(v.children('.port-name').html())
                if (v.data().value <= 0) {
                    tar.val('').data('value', '').data('type', '')
                    v.parent().hide()
                    e.preventDefault()
                    return false
                }
                tar.data('value', v.data().value).data('type', v.data().type).trigger('change', [value])
                ES.event.fire(v.parent().data().value, 'change', v.data().value)
                v.parent().hide()
                e.preventDefault()
            })
        })
    }
    var intveral = null
    var inp = null
    var input_callback = function () {
        if (!inp)
            return
        var t_inp = $(inp)
        t_inp.data('value', t_inp.val())
        filter_geo.apply(inp)
    }
    if (window.attachEvent && document.getElementById(ret.id).onpropertychange) {
        document.getElementById(ret.id).onpropertychange = function () {
            if (inp) {
                ES.get('#' + ret.id).data().value = ''
                if (intveral != null) {
                    clearTimeout(intveral)
                    intveral = null
                }
                intveral = setTimeout(input_callback, 300)
            }
        }
    } else {
        ES.get('#' + ret.id).on('input', function () {
            if (inp) {
                ES.get('#' + ret.id).data().value = ''
                if (intveral != null) {
                    clearTimeout(intveral)
                    intveral = null
                }
                intveral = setTimeout(input_callback, 300)
            }
        })
    }
    ES.get('#' + ret.id).on('keydown', function (evt) {
        inp = null
        var drop = $('#' + $(this).attr('id') + '-drop')
        var children = drop.children('div.input-port-item')
        if (evt.which == 13) {
            // enter
            drop.children('div.input-port-item-selected').eq(0).trigger('click')
            evt.preventDefault()
        } else if (evt.which == 9) {
            // tab
            if ($(this).val()) {
                drop.children('div.input-port-item-selected').eq(0).trigger('click')
            } else {
                drop.hide()
            }
            // tab can not preventDefault since we need browser to do other things
        } else if (evt.which == 38) {
            // arrow top
            var total = children.length
            for (var i = 0; i < total; i++) {
                if (i > 0 && children.eq(i).hasClass('input-port-item-selected')) {
                    children.eq(i).removeClass('input-port-item-selected')
                    children.eq(i - 1).addClass('input-port-item-selected')
                    break;
                }
            }
            evt.preventDefault()
        } else if (evt.which == 40) {
            // arrow down
            var total = children.length
            for (var i = 0; i < total; i++) {
                if (i < total - 1 && children.eq(i).hasClass('input-port-item-selected')) {
                    children.eq(i).removeClass('input-port-item-selected')
                    children.eq(i + 1).addClass('input-port-item-selected')
                    break;
                }
            }
            evt.preventDefault()
        } else {
            if ((evt.which < 48 && evt.which > 9) ||
                (evt.which > 105 && evt.which < 112) ||
                (evt.which > 123 && evt.which < 223)) {
                evt.preventDefault()
                return
            }
            inp = this
        }
    }).on('click', function (e) {
        ES.get(this).trigger('focus')
        e.preventDefault()
        return false
    }).on('focus', function (e) {
        var c = ES.get('#' + ES.get(this).attr('id') + '-drop')
        if (!c.is(":visible")) {
            c.show()
            var c = ES.get(this)
            var v = c.data('value')
            c.data('value', '')
            filter_geo.apply(this, [v])
            c.data('value', v)
        }
        e.preventDefault()
        return false
    })
    ret.etype = 'input_port'
    ES.ui.add(ret.id, ret)
    return ret
}

ES.ui.input_city = function (config) {
    config.value_field = function (rES) {
        return rES.id
    }
    config.display_field = function (rES) {
        return rES.name
    }
    config.filter = function (list, value) {
        var ret = []
        ES.each(list, function (_, v) {
            if (v.name.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
                v.nameEN.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                ret.push(v)
            }
        })
        return ret
    }
    var filter = ES.ui.input_filter(config)

    ES.util.ajax_get('/geo/query_all_city', {}, function (rES) {
        filter.load_data(rES.children)
    })

    return filter
}

ES.ui.input_filter = function (config) {
    var ret = ES.ui.input(config)
    var allow_enter = config.allow_enter
    ret.data = config.data ? config.data : []
    ret.value_field = config.value_field ? config.value_field : function () {
        return ''
    }
    ret.display_field = config.display_field ? config.display_field : function () {
        return ''
    }
    ret.filter = config.filter ? config.filter : function () {
        return []
    }
    ret.get_value = function () {
        if (allow_enter) {
            return this.el.data('value') || this.el.val() || ''
        }
        else {
            return this.el.data('value') ? this.el.data('value') : ''
        }
    }
    ret.get_display_value = function () {
        return this.el.val()
    }
    ret.set_display_value = function (val) {
        return this.el.val(val)
    }
    ret.set_value = function (val) {
        if (ret.data.length > 0) {
            var has_val = false
            ES.each(ret.data, ES.delegate(function (_, v) {
                if (ret.value_field(v) == val) {
                    this.el.data('value', val)
                    this.el.val(ret.display_field(v))
                    has_val = true
                    return false
                }
            }, this))
            if (!has_val) {
                this.el.val(val)
            }
        } else {
            this.el.val(val)
        }
        return this.el
    }
    ret.load_data = function (data) {
        this.data = data
        return this
    }
    ret.clear_value = function () {
        return this.el.val('').data('value', '')
    }
    var table = $('<div class="input-drop input-filter-drop" data-value="' + ret.id + '" id="' + ret.id + '-drop"></div>')
    $('body').append(table)
    var filter = function () {
        var input = $(this)
        if (input.hasClass('disabled')) {
            return
        }
        var value = input.data('value')
        var display = input.val().trim()
        if (!value) {
            value = ''
        }
        var drop = $('#' + input.attr('id') + '-drop')
        var par = ES.ui.get(input.attr('id'))

        var width = input.outerWidth()
        var height = input.outerHeight()
        var offset = input.offset()
        var poupFlag = input.closESt('.popup').length > 0 ? true : false
        var infactTop = offset.top + height
        if (poupFlag) {
            infactTop = infactTop - $(document).scrollTop()
        }
        drop.css({
            'top': infactTop,
            'left': offset.left,
            'min-width': width,
            'position': poupFlag ? 'fixed' : 'absolute'
        })
        drop.empty()

        if (par.data.length <= 0) {
            if (allow_enter) {
                drop.html('').hide()
            } else {
                drop.html('<div>' + ES.msg.get('default_empty_rESult') + '</div>').show()
            }
        }
        var rES = (!value && !display) ? par.data : par.filter(par.data, display, value)
        if (rES.length <= 0) {
            if (allow_enter) {
                drop.html('').hide()
            } else {
                drop.html('<div>' + ES.msg.get('default_empty_rESult') + '</div>').show()
            }
            return
        }
        var out = []
        ES.each(rES, function (_, v) {
            out.push('<div data-value="' + par.value_field(v) + '">' + par.display_field(v) + '</div>')
        })
        drop.html(out.join('')).show().children('div').on('click', function (e) {
            var v = $(this)
            var id = v.parent().data().value
            $('#' + id).val(v.html()).data('value', v.data().value)
            ES.event.fire(id, 'change', v.data().value)
            v.parent().hide()
            e.preventDefault()
        })
    }

    var input_listener = function (evt) {
        filter.apply(this)
        evt.preventDefault()
    }

    if (window.attachEvent && document.getElementById(ret.id).onpropertychange) {
        document.getElementById(ret.id).onpropertychange = input_listener
    } else {
        ES.get('#' + ret.id).on('input', input_listener)
    }

    var drop = $('#' + ret.id + '-drop')

    var scrollCalculate = function () {
        var selectedTop = drop.find('.input-item-selected').offset().top
        var dropTop = drop.offset().top
        var selectedOutHeight = drop.find('.input-item-selected').outerHeight()
        var dropOutHeight = drop.outerHeight()
        if (selectedTop - dropTop + selectedOutHeight <= 1) {
            var height = 0
            ES.each(ES.get('.input-item-selected').prevAll(), function (_, item) {
                height += $(item).outerHeight()
            })
            ES.get('.input-drop').scrollTop(height)
        } else if (selectedTop - dropTop + selectedOutHeight > dropOutHeight) {
            var height = 0
            ES.each(ES.get('.input-item-selected').prevAll(), function (_, item) {
                height += $(item).outerHeight()
            })
            ES.get('.input-drop').scrollTop(height + selectedOutHeight - dropOutHeight)
        }
    }

    ES.get('#' + ret.id).on('keyup', function (evt) {
        if (evt.which == 13) {
            // enter
            if (drop.find('.input-item-selected').length > 0) {
                drop.children('.input-item-selected').eq(0).trigger('click')
            } else {
                drop.children('div').eq(0).trigger('click')
            }
            evt.preventDefault()
        } else if (evt.which == 9) {
            // tab
            if (ES.get('#' + ret.id).val()) {
                drop.children('div').eq(0).trigger('click')
            } else {
                //drop.hide()
            }
            // tab can not preventDefault since we need browser to do other things
        } else {
            if ((evt.which < 48 && evt.which > 9) ||
                (evt.which > 105 && evt.which < 112) ||
                (evt.which > 123 && evt.which < 223)) {
                evt.preventDefault()
                return
            }
        }
        // if (ES.get('#' + ret.id).val().trim() == '') {
        // 	ES.ui.get(ret.id).clear_value();
        // }
    }).on('keydown', function (evt) {
        var drop = $('#' + $(this).attr('id') + '-drop')
        var children = drop.children('div')
        if (evt.which == 9) {
            // tab
            if (ES.get('#' + ret.id).val() && drop[0].style.display != 'none') {
                drop.children('div').eq(0).trigger('click')
            } else {
                drop.hide()
            }
        } else if (evt.which == 38) {
            // arrow top
            var total = children.length
            for (var i = 0; i < total; i++) {
                if (i > 0 && children.eq(i).hasClass('input-item-selected')) {
                    children.eq(i).removeClass('input-item-selected')
                    children.eq(i - 1).addClass('input-item-selected')
                    break;
                }
            }
            scrollCalculate()
            evt.preventDefault()
        } else if (evt.which == 40) {
            // arrow down
            var total = children.length
            for (var i = 0; i < total; i++) {
                if (i < total - 1 && children.eq(i).hasClass('input-item-selected')) {
                    children.eq(i).removeClass('input-item-selected')
                    children.eq(i + 1).addClass('input-item-selected')
                    break;
                } else {
                    if (drop.find('.input-item-selected').length > 0) continue
                    children.eq(0).addClass('input-item-selected')
                    break;
                }
            }
            scrollCalculate()
            evt.preventDefault()
        }
    }).on('click', function (e) {
        e.preventDefault()
        return false
    }).on('focus', function () {
        $(document).trigger('click')
        $(this).data('value', '')
        filter.apply(this)
    }).on('mouseup', function () {
        $(this).select()
    })
    ret.etype = 'input_filter'
    ES.ui.add(ret.id, ret)
    return ret
}

ES.ui.geo_selector_v2 = function (config) {
    var ret = ES.ui.select(config)
    var from_level = config.from_level || 0
    var to_level = config.to_level || 3
    var def_val = config.value || null
    var lang = config.lang
    var ratio = config.ratio
    var has_set_value = false

    var filter_geo = function (comp, level, val, set_val, is_inited) {
        var query = '/geo/query'
        if (level <= 0) {
            query = '/geo/query_all_country'
        }
        var param = {
            parent: val
        }
        if (lang) {
            param.lang = lang
        }
        ES.util.ajax_get(query, param, function (rES) {
            if (has_set_value && is_inited) return
            var list = rES.children
            if (list.length < 1) {
                var parent_comp = comp.parent()
                comp.remove()
                rESet_css(parent_comp.children('select'))
                return
            }
            var out = [ES.util.format_string(ES.tpl.option_tpl, {
                display: ES.lang == ES.consts.language.ZH_CN ? '请选择' : 'Please Select...',
                value: -1
            })]
            for (var i = 0, l = list.length; i < l; i++) {
                out.push(ES.util.format_string(ES.tpl.option_tpl, {
                    display: list[i].name,
                    value: list[i].id
                }))
            }
            comp.empty().append(out.join(''))
            if (set_val) {
                comp.val(set_val)
            }
            comp.unbind('change')
            comp.on('change', function () {
                var c = ES.get(this)
                var v = c.val()
                var index = c.parent().children('select').index(c)
                if (index + 1 <= to_level) {
                    c.nextUntil("span").remove()
                    if (v == '-1') {
                        rESet_css(c.parent().children('select'))
                        return false;
                    }
                    var s = ES.get('<select data-value="' + (index + 1) + '"></select>')
                    s.insertAfter(c)
                    rESet_css(c.parent().children('select'))
                    filter_geo(s, index + 1, v)
                }
            })
            if (def_val) {
                comp.trigger('change')
            }
        })
    }
    var rESet_css = function (child_list) {
        if (ratio) {
            var perc = 100 / child_list.length * ratio
        } else {
            var perc = 100 / child_list.length * 0.50
        }
        for (var child in child_list) {
            if (child_list.hasOwnProperty(child)) {
                child_list.eq(child).css({
                    'width': perc + '%',
                    'margin-right': '5px'
                })
            }
        }
    }
    ret.from_level = from_level
    ret.to_level = to_level
    ret.default_value = def_val
    filter_geo(ret.el, from_level, null, def_val, true)
    ret.el.data('value', def_val)

    ret.etype = 'geo_selector'
    ret.get_value = function () {
        var ret = 0
        var child_list = this.el.parent().children('select')
        for (var i = child_list.length - 1; i >= 0; i--) {
            ret = +(child_list.eq(i).val())
            if (ret > 0) {
                break;
            }
        }
        if (ret < 0) {
            ret = 0
        }
        return ret
    }
    ret.get_display_value = function () {
        var display_val = ''
        var child_list = this.el.parent().children('select')
        if (child_list.length == 1 && child_list.eq(0).find('option:selected').val() == '-1') {
            return display_val
        } else {
            for (var i = 0; i < child_list.length; i++) {
                var thisSelect = child_list.eq(i).find('option:selected')
                if (thisSelect.val() != -1) {
                    display_val += '-' + thisSelect.text()
                }
            }
            display_val = display_val.replace('-', '')
            return display_val
        }
    }
    ret.set_value = function (v) {
        def_val = null
        has_set_value = true
        var v = v || []
        this.el.parent().children('select').first().nextAll('select').remove()
        if (v.length < 1) {
            filter_geo(this.el, this.from_level, null, null)
        } else {
            v = [null].concat(v)
            var s = this.el.parent().children('select').first()
            var msg = this.el.parent().children().last()
            for (var i = 0; i < v.length - 1; i++) {
                if (i > 0) {
                    s = ES.get('<select data-value="' + i + '"></select>')
                    s.insertBefore(msg)
                }
                filter_geo(s, this.from_level + i, v[i], v[i + 1], false)
            }
        }
        rESet_css(this.el.parent().children('select'))
    }
    ret.clear_value = function () {
        def_val = this.default_value
        this.el.nextUntil("span").remove()
        filter_geo(this.el, this.from_level, null, this.default_value)
        rESet_css(this.el.parent().children('select'))
    }
    ret.disable = function () {
        var child_list = this.el.parent().children('select')
        child_list.each(function (_, v) {
            $(v).addClass('disabled').attr('disabled', true)
        })
    }
    ret.enable = function () {
        var child_list = this.el.parent().children('select')
        child_list.each(function (_, v) {
            $(v).removeClass('disabled').removeAttr('disabled')
        })
    }
    ES.ui.add(ret.id, ret)
    return ret
}

ES.ui.geo_selector = function (config) {
    var ret = ES.ui.input(config)
    ret.el.attr('readonly', true)
    var geo_div = $('<div class="input-drop input-geo-drop" data-value="' + ret.id + '" id="' + ret.id + '-drop"></div>')
    $('body').append(geo_div)
    var dom = {
        el: ret.id + '-drop',
        tabs: [{
            value: '',
            display: '国家',
            cls: ''
        }, {
            value: '',
            display: '省份',
            cls: ''
        }, {
            value: '',
            display: '城市',
            cls: ''
        }, {
            value: '',
            display: '区县',
            cls: ''
        }, {
            value: '',
            display: '街道',
            cls: ''
        }],
        panels: [{}, {}, {}, {}, {}]
    }

    ES.ui.tab_v(dom)

    var show_geo = function () {
        var geo = $(this)
        var width = geo.outerWidth()
        var height = geo.outerHeight()
        var offset = geo.offset()
        var tab_panel = ES.ui.get(geo.attr('id') + '-drop')
        tab_panel.el.css({
            top: offset.top + height,
            left: offset.left,
            width: width
        })
        tab_panel.el.show()
    }
    var filter_geo = function (tab_panel, level, val) {
        var query = '/geo/query'
        if (level <= 0) {
            query = '/geo/query_all_country'
        }

        tab_panel.set_panel(level)
        ES.util.ajax_get(query, {
            parent: val
        }, function (rES) {
            var out = ['<ul>']
            ES.each(rES.children, function (_, v) {
                out.push('<li data-value="' + v.id + '">' + v.name + '</li>')
            })
            out.push('</ul>')
            tab_panel.set_panel_dom(level, out.join(''))

            ES.get('#' + tab_panel.id + ' .panel').eq(level).children('ul').children('li').on('click', function () {
                var li = $(this)
                li.parent().children('li').removeClass('selected')
                li.addClass('selected')
                var value = li.data('value')
                var lev = li.closESt('.panel').index()
                var drop = li.closESt('.input-geo-drop')
                lev = (+lev) + 1

                var get_selected_string = function (drop) {
                    var list = drop.find('.selected')
                    var rES = []
                    ES.each(list, function (_, v) {
                        rES.push($(v).html())
                    })
                    return rES.join(' - ')
                }
                ES.get('#' + drop.data('value')).val(get_selected_string(drop)).data('value', value)

                if (lev >= 5) {
                    drop.hide()
                    return
                }
                var tab_panel = ES.ui.get(drop.attr('id'))
                filter_geo(tab_panel, lev, value)
            })
        })
    }
    ES.get('#' + ret.id).on('click', function (e) {
        if (ES.get(this).hasClass('disabled')) {
            e.preventDefault()
            return false
        }
        show_geo.apply(this)
        filter_geo(ES.ui.get($(this).attr('id') + '-drop'), 0, null)
        e.preventDefault()
        return false
    })
    ret.etype = 'geo_selector'
    ret.get_value = function () {
        return +this.el.data('value')
    }
    ret.set_value = function (v) {
        return this.el.data('value', v)
    }
    ret.set_display_value = function (v) {
        return this.el.val(v)
    }
    ret.clear_value = function () {
        return this.el.val('').data('value', '')
    }

    ES.ui.add(ret.id, ret)
    return ret
}

ES.ui.input_form = function (config) {
    var ES_input_form = function (conf) {
        conf = conf || {}
        if (!conf.el) {
            return
        }
        var id = '#' + conf.el
        var el = $(id)
        el.addClass('form-wrap')
        var items_dom = el.children()
        var items = []
        var item_index = 0
        $.each(items_dom, function (i, v) {
            if ('input' != v.tagName.toLowerCase() &&
                'textarea' != v.tagName.toLowerCase() &&
                'select' != v.tagName.toLowerCase()) {

                return true
            }
            conf.items[item_index].el = $(v).attr('id')
            var input
            if (conf.items[item_index].type == 'select') {
                input = ES.ui.select(conf.items[item_index])
            } else if (conf.items[item_index].type == 'geo') {
                input = ES.ui.geo_selector(conf.items[item_index])
            } else if (conf.items[item_index].type == 'geo_v2') {
                input = ES.ui.geo_selector_v2(conf.items[item_index])
            } else if (conf.items[item_index].type == 'port') {
                input = ES.ui.input_port(conf.items[item_index])
            } else if (conf.items[item_index].type == 'filter') {
                input = ES.ui.input_filter(conf.items[item_index])
            } else if (conf.items[item_index].type == 'qty') {
                input = ES.ui.input_qty(conf.items[item_index])
            } else if (conf.items[item_index].type == 'date_time') {
                input = ES.ui.input_date_time(conf.items[item_index])
            } else if (conf.items[item_index].type == 'time') {
                input = ES.ui.input_time(conf.items[item_index])
            } else if (conf.items[item_index].type == 'file') {
                input = ES.ui.file(conf.items[item_index])
            } else if (conf.items[item_index].type == 'btn') {
                input = ES.ui.button(conf.items[item_index])
            } else if (conf.items[item_index].type == 'date_input') {
                input = ES.ui.input_date_input(conf.items[item_index])
            } else if (conf.items[item_index].type == 'year_month') {
                input = ES.ui.input_year_month(conf.items[item_index])
            } else {
                input = ES.ui.input(conf.items[item_index])
            }
            items.push(input)
            item_index++
        })
        this.id = conf.el
        this.customer_validate = conf.validate
        this.validate = function () {
            this.clear_invalid()
            var rESult = true
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].msg_type == 'popup-tips') {
                    if (!this.items[i].validate()) {
                        rESult = false
                        break;
                    }
                    rESult = true
                } else {
                    rESult = this.items[i].validate() && rESult
                }
            }
            if (rESult && this.customer_validate) {
                rESult = this.customer_validate()
            }
            return rESult
        }
        this.clear_invalid = function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].clear_invalid()
            }
        }
        this.get_value = function () {
            var rES = {}
            for (var i = 0; i < this.items.length; i++) {
                var name = this.items[i].el.attr('name')
                if (!name) {
                    name = this.items[i].id
                }
                if (!name) {
                    continue
                }
                if (this.items[i].etype == 'input_date_input') {
                    rES = ES.util.merge(rES, this.items[i].get_value())
                } else {
                    rES[name] = this.items[i].get_value()
                }
            }
            return rES
        }
        this.set_value = function (obj) {
            for (var i = 0; i < this.items.length; i++) {
                var name = this.items[i].el.attr('name')
                if (!name) {
                    name = this.items[i].id
                }
                if (this.items[i].etype == 'input_date_input') {
                    var to_el = this.items[i].toName
                    if (obj[name] && obj[to_el]) {
                        var dateVal = {}
                        dateVal[name] = obj[name]
                        dateVal[to_el] = obj[to_el]
                        this.items[i].set_value(dateVal)
                    }
                } else if (obj[name] || obj[name] === 0) {
                    this.items[i].set_value(obj[name])
                }
            }
        }
        this.clear_value = function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].clear_value()
            }
        }
        this.get_item = function (index) {
            return this.items[index]
        }
        this.get_item_by_id = function (id) {
            var rES = null
            ES.each(this.items, function (_, v) {
                if (v.el.attr('name') == id || v.id == id) {
                    rES = v
                    return false
                }
            })
            return rES
        }
        this.disable = function () {
            for (var i = 0; i < this.items.length; i++) {
                if (!this.items[i].disable) {
                    continue
                }
                this.items[i].disable()
            }
        }
        this.enable = function () {
            for (var i = 0; i < this.items.length; i++) {
                if (!this.items[i].enable) {
                    continue
                }
                this.items[i].enable()
            }
        }
        this.items = items
        this.el = el
        this.etype = 'input_form'
    }
    var ret = new ES_input_form(config)
    ES.ui.add(ret.id, ret)
    return ret
}

ES.ui.button = function (config) {
    var ES_button = function (conf) {
        conf = conf || {}
        if (!conf.el) {
            return
        }
        conf.text = conf.text || ''
        var id = '#' + conf.el
        var el = $(id)
        el.addClass('btn').attr('href', 'javascript:void(0)').html(conf.text)
        if (conf.cls) {
            el.addClass(conf.cls)
        }
        if (conf.onclick) {
            el.on('click', conf.onclick)
        }
        this.id = conf.el
        this.el = el
        this.etype = 'button'
    }
    var ret = new ES_button(config)
    ES.ui.add(ret.id, ret)
    return ret
}

ES.ui.input_qty = function (config) {
    var ES_input_qty = function (conf) {
        conf = conf || {}
        conf = ES.util.merge({
            max_value: 99999,
            min_value: 0,
            validate: function () {
                var v = +this.get_value()
                return v <= this.max_value && v >= this.min_value
            }
        }, conf)
        if (!conf.el) {
            return
        }
        conf.text = conf.text || ''
        var id = '#' + conf.el
        var el = $(id)

        var cls = conf.cls ? conf.cls : ''
        el.addClass('input-qty').wrap("<div class='wrap input-wrap  " + cls + "'></div>")

        var label = conf.label
        var after_labels = conf.after_labels
        var nonempty = conf.nonempty ? conf.nonempty : false
        var parent = el.parent()

        if (label) {
            if (nonempty) {
                label = '<span class="nonempty">*</span>' + label
            }
            if (el.attr('type') != 'checkbox' && el.attr('type') != 'radio') {
                parent.prepend(ES.util.format_string(ES.tpl.label_tpl, {
                    display: label,
                    id: conf.el
                }))
            } else {
                parent.append(ES.util.format_string(ES.tpl.label_tpl, {
                    display: label,
                    id: conf.el
                }))
            }
        }

        var minus = '<button class="input-qty-minus" type="button">−</button>'
        var plus = '<button class="input-qty-plus" type="button">+</button>'

        el.parent().prepend(minus).append(plus)

        if (after_labels) {
            ES.each(after_labels, function (_, v) {
                parent.append('<span class="input-content">' + v + '</span>')
            })
        }

        el.parent().children('.input-qty-minus').on('click', function () {
            var qty = $(this).parent().children('.input-qty')
            if (+qty.val() <= 0) {
                return false
            }
            qty.val(+qty.val() - 1)
            ES.event.fire(qty.attr('id'), 'change', qty.val())
            qty.trigger("change");
        })
        el.parent().children('.input-qty-plus').on('click', function () {
            var qty = $(this).parent().children('.input-qty')
            qty.val(+qty.val() + 1)
            ES.event.fire(qty.attr('id'), 'change', qty.val())
            qty.trigger("change");
        })
        el.on('change', function (e) {
            var v = +$(this).val()
            v = Math.ceil(v)
            var comp = ES.ui.get(e.target.id)
            var change_val = v
            if (!$.isNumeric(v) || v < comp.min_value) {
                $(this).val(comp.min_value)
                change_val = comp.min_value
                e.preventDefault()
            }
            else if (v > comp.max_value) {
                $(this).val(comp.max_value)
                change_val = comp.max_value
                e.preventDefault()
            } else {
                $(this).val(v)
            }
            ES.event.fire($(this).attr('id'), 'change', change_val)
        })

        this.get_value = function () {
            var v = +(this.el.val())
            if (!$.isNumeric(v) || v < this.min_value) {
                v = this.min_value
            }
            return v
        }
        this.set_value = function (v) {
            var v = +v
            if (!$.isNumeric(v) || v < this.min_value) {
                v = this.min_value
            }
            return this.el.val(v)
        }
        this.clear_value = function () {
            return this.el.val('')
        }
        this.disable = function () {
            this.el.parent().children().attr('disabled', true)
        }
        this.enable = function () {
            this.el.parent().children().attr('disabled', false)
        }
        this.nonempty = nonempty
        this.msg = config.msg
        this.customer_validate = conf.validate
        this.validate = function () {
            this.clear_invalid()
            var rESult = true
            if (this.nonempty && !this.get_value()) {
                this.set_msg(this.msg)
                rESult = false
            }
            if (rESult && this.customer_validate) {
                rESult = this.customer_validate()
            }
            return rESult
        }

        this.clear_invalid = function () {
            var tip_msg = this.el.closESt('div').find('.msg-tip')
            if (tip_msg.length > 0) {
                tip_msg.remove()
            }
            this.el.removeClass('ES-input-invalid')
            this.el.parent().children('.msg').empty().removeClass('error').hide()
        }

        this.set_msg = function (msg) {
            this.msg = msg
            if (conf.msg_type && conf.msg_type == 'tips') {
                var tips = '<div class="msg-tip error">' + msg + '</div>'
                ES.get(tips).insertBefore(this.el)
            } else {
                this.el.parent().children('.msg').addClass('error').html('<i class="fa fa-timES-circle"></i> ' + msg).show()
            }
        }

        this.max_value = +conf.max_value
        this.min_value = +conf.min_value
        this.id = conf.el
        this.el = el
        this.etype = 'input_qty'
    }
    var ret = new ES_input_qty(config)
    ES.ui.add(ret.id, ret)
    return ret
}

ES.ui.tab_h = function (config) {
    var ES_tab_h = function (conf) {
        conf = conf || {}
        if (!conf.el) {
            return
        }
        var id = "#" + conf.el
        var el = $(id)
        var tpl = ES.tpl.tab_h_tpl
        var template = Handlebars.compile(tpl)
        conf.tabs[0].cls = "current"
        var html = template(conf);
        el.append(html)
        this.id = conf.el
        this.el = el
        this.etype = 'tab_h'

        ES.get(id + ' .tab').on('click', function () {
            var last_index = $(this).parent().children('.current').data().index
            $(this).parent().children().removeClass('current')
            var index = $(this).addClass('current').data().value
            var list = ES.get(id + ' .panel')
            list.hide()
            list.eq(+index).show()
            ES.event.fire(conf.el, 'tab-change', [list.eq(+last_index), list.eq(+index)])
        })

        ES.get(id + ' .panel').eq(0).show()
    }
    var ret = new ES_tab_h(config)
    ES.ui.add(ret.id, ret)
    return ret
}

ES.ui.tab_v = function (config) {
    var ES_tab_v = function (conf) {
        conf = conf || {}
        if (!conf.el) {
            return
        }
        var id = "#" + conf.el
        var el = $(id)
        var tpl = ES.tpl.tab_v_tpl
        var template = Handlebars.compile(tpl)
        conf.tabs[0].cls = "current"
        var html = template(conf);
        el.append(html)
        this.id = conf.el
        this.el = el
        this.etype = 'tab_v'

        ES.get(id + ' .tab').on('click', function () {
            var last_index = $(this).parent().children('.current').data().index
            $(this).parent().children().removeClass('current')
            var index = $(this).addClass('current').data().index
            var list = ES.get(id + ' .panel')
            list.hide()
            list.eq(+index).show()
            ES.event.fire(conf.el, 'tab-change', [list.eq(+last_index), list.eq(+index)])
        })

        ES.get(id + ' .panel').eq(0).show()

        this.set_panel_dom = function (index, dom) {
            var id = '#' + this.id
            ES.get(id + ' .panel').eq(index).html(dom)
        }

        this.set_panel = function (index) {
            var id = '#' + this.id
            ES.get(id + ' .tab').eq(index).trigger('click')
        }
    }
    var ret = new ES_tab_v(config)
    ES.ui.add(ret.id, ret)
    return ret
}

ES.ui.date_selector = function (config) {
    var ES_date_selector = function (conf) {
        conf = conf || {}
        if (!conf.el) {
            return
        }
        var id = "#" + conf.el
        var el = $(id)
        var d = config.date
        if (!d) {
            d = ES.util.new_date()
        }
        this.el = el
        this.id = conf.el

        this.set_date = function (d) {
            var sel_index = this.el.children('.date-selector').children('ul').children('li.date-selector-selected').index()
            if (sel_index < 0) {
                sel_index = 4
            }
            sel_index--

            this.el.empty()

            var tpl = ES.tpl.date_selector
            var template = Handlebars.compile(tpl);

            var day_of_week = d.getDay()
            d.addDate(0 - day_of_week)
            d.addDate(0 - (7 * sel_index + 1))

            var total_width = this.el.width()
            var avg_width = (total_width - 11 - 30) / 7

            var date = []

            date.push({
                cls: 'date-selector-item-arrow',
                style: 'width:15px;',
                parent: this.id,
                value: ES.util.date_to_string(d),
                content: '<i class="fa fa-caret-left"></i>'
            })
            for (var i = 0; i < 7; i++) {
                d.addDate(1)
                var value = ES.util.date_to_string(d)
                var date_display = ES.util.date_to_string(d, '{{m}}/{{d}}')
                d.addDate(6)
                date_display += ' - ' + ES.util.date_to_string(d, '{{m}}/{{d}}')
                date.push({
                    cls: '',
                    style: 'width:' + avg_width + 'px;',
                    parent: this.id,
                    value: value,
                    content: date_display
                })
            }
            d.addDate(1)
            date.push({
                cls: 'date-selector-item-arrow',
                style: 'width:15px;',
                parent: this.id,
                value: ES.util.date_to_string(d),
                content: '<i class="fa fa-caret-right"></i>'
            })

            var html = template({
                date: date
            })
            el.append(html)

            this.el.children('.date-selector').children('ul').children('li').on('click', function () {
                var obj = $(this)
                var index = obj.index()
                var parent = obj.data().parent
                var d = obj.data().value
                if (!obj.hasClass('date-selector-item-arrow')) {
                    ES.ui.get(parent).set_current(index - 1)
                } else {
                    d = new Date(obj.parent().children('.date-selector-selected').data().value)
                    if (index == 0) {
                        d.addDate(-49)
                    } else {
                        d.addDate(49)
                    }
                    ES.ui.get(parent).set_date(d)
                }
            })

            this.set_current(sel_index)
        }
        this.set_current = function (index) {
            var li = this.el.children('.date-selector').children('ul').children('li').removeClass('date-selector-selected').eq(index + 1).addClass('date-selector-selected')
            ES.event.fire(this.id, 'change', li.data().value)
        }
        this.set_date(config.date)
    }
    var ret = new ES_date_selector(config)
    ES.ui.add(ret.id, ret)
    return ret
}

ES.ui.paging = function (config) {
    var pagESize = $.cookie('pagESize')
    var setCookie = !pagESize ? false : true
    if (!pagESize) {
        pagESize = 25
    }
    ES.pagESize = pagESize
    var ES_paging = function (conf) {
        conf = conf || {}
        if (!conf.el) {
            return
        }
        var id = "#" + conf.el
        var el = $(id)

        this.el = el
        this.el.addClass('paging')
        this.id = conf.el
        this.show_per_page = conf.perPage || true

        this.refrESh = function (total_page, page, total_count) {
            this.current = page
            var paging = $('#' + this.id)
            var from = page - 2
            var end = page + 2
            if (from <= 0) {
                from = 1
                end = from + 4
            }
            if (end > total_page) {
                end = total_page
                from = total_page - 4
            }
            if (from <= 0) {
                from = 1
            }
            if (total_count <= 0) {
                paging.empty()
                return
            }
            var itemTpl = '<a class="paging-item" href="javascript:void(0)" title="{{title}}" data-value="{{value}}" data-parent="{{parent}}">{{display}}</a>'
            paging.empty()
            var inner = []
            if (page > 1) {
                inner.push(ES.util.format_string(itemTpl, {
                    display: '<span><i class="fa fa-angle-double-left"></i></span>',
                    value: 1,
                    title: 'Page ' + (1),
                    parent: this.id
                }))
                inner.push(ES.util.format_string(itemTpl, {
                    display: '<span><i class="fa fa-angle-left"></i></span>',
                    value: page - 1,
                    title: 'Page ' + (page - 1),
                    parent: this.id
                }))
            } else {
                inner.push(ES.util.format_string(itemTpl, {
                    display: '<span class="paging-disabled"><i class="fa fa-angle-double-left"></i></span>',
                    value: -1,
                    title: '',
                    parent: this.id
                }))
                inner.push(ES.util.format_string(itemTpl, {
                    display: '<span class="paging-disabled"><i class="fa fa-angle-left"></i></span>',
                    value: -1,
                    title: '',
                    parent: this.id
                }))
            }
            for (var i = from - 1; i < end; i++) {
                var item = '<span>' + (i + 1) + '</span>'
                if (i + 1 === page) {
                    item = '<span class="paging-current">' + (i + 1) + '</span>'
                }
                inner.push(ES.util.format_string(itemTpl, {
                    display: item,
                    value: i + 1,
                    title: 'Page ' + (i + 1),
                    parent: this.id
                }))
            }
            if (page < end) {
                inner.push(ES.util.format_string(itemTpl, {
                    display: '<span><i class="fa fa-angle-right"></i></span>',
                    value: page + 1,
                    title: 'Page ' + (page + 1),
                    parent: this.id
                }))
                inner.push('<span style="display: inline-block;padding-right: 5px;color: #ccc;">...</span>')
                inner.push(ES.util.format_string(itemTpl, {
                    display: '<span><i class="fa fa-angle-double-right"></i></span>',
                    value: total_page,
                    title: 'Page ' + (total_page),
                    parent: this.id
                }))
            } else {
                inner.push(ES.util.format_string(itemTpl, {
                    display: '<span class="paging-disabled"><i class="fa fa-angle-right"></i></span>',
                    value: -1,
                    title: '',
                    parent: this.id
                }))
                inner.push(ES.util.format_string(itemTpl, {
                    display: '<span class="paging-disabled"><i class="fa fa-angle-double-right"></i></span>',
                    value: -1,
                    title: '',
                    parent: this.id
                }))
            }
            inner.push('<span class="paging-info"> ' + ES.msg.get('common_paging_recordnum', {arg0: ' ' + total_count + ' '}) + ' / ' + total_page + ' ' + ES.msg.get('common_paging_pagenum') + '</span>')
            if (this.show_per_page) {
                inner.push('&nbsp;<span class="paging-info"> ' + ES.msg.get('per_page') + '：<a>25</a>，<a>50</a>，<a>100</a></span>')
            }
            paging.html(inner.join(''));
            $('#' + this.id + ' .paging-item').click(function () {
                var page = $(this).data('value')
                var id = $(this).data('parent')
                if (page > 0) {
                    ES.event.fire(id, 'change', page)
                }
            })
            if (this.show_per_page) {
                var set_pagESize_link = $('#' + this.id + ' .paging-info a')
                set_pagESize_link.each(function (_, v) {
                    if (ES.get(v).html() == ES.pagESize) {
                        ES.get(v).addClass('active')
                    }
                })
                set_pagESize_link.click(ES.delegate(function (e) {
                    var pagESize = $(e.target).html()
                    ES.pagESize = pagESize
                    $.cookie('pagESize', ES.pagESize, {
                        expirES: 365,
                        path: '/'
                    })
                    ES.event.fire(this.id, 'change', 1)
                }, this))
            }
        }
        this.current = 1
    }
    var ret = new ES_paging(config)
    ES.ui.add(ret.id, ret)
    return ret
}

ES.ui.map = function (el, rES, mapType) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=GOEGRcwYZBAXOlU7a0bwf9DV&callback=trackingCallback";
    document.body.appenEShild(script);
    var data = rES.movements;

    window.trackingCallback = function () {
        var map = new BMap.Map(el);
        if (mapType != 'current_position') {
            map.adESontrol(new BMap.ScaleControl({
                anchor: BMAP_ANCHOR_TOP_LEFT
            }))
            map.adESontrol(new BMap.NavigationControl());
            map.adESontrol(new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT,
                type: BMAP_NAVIGATION_CONTROL_SMALL
            }))
            map.adESontrol(new BMap.MapTypeControl({
                anchor: BMAP_ANCHOR_BOTTOM_RIGHT
            }));
        }

        var pointList = []
        for (var i = 0; i < data.length; i++) {
            var point = new BMap.Point(data[i].shipLongitude, data[i].shipLatitude)
            pointList.push(point)
        }
        var fromPoint = new BMap.Point(data[0].shipLongitude, data[0].shipLatitude)

        var myIcon = new BMap.Icon("/common/img/startingPoint.png", new BMap.Size(30, 50));
        var fromMarker = new BMap.Marker(fromPoint, {icon: myIcon, offset: new BMap.Size(0, -30)});
        map.addOverlay(fromMarker);

        var currentPoint = new BMap.Point(data[data.length - 1].shipLongitude, data[data.length - 1].shipLatitude)
        var vectorFCArrow = new BMap.Marker(new BMap.Point(currentPoint.lng - 0.01, currentPoint.lat), {
            // 初始化方向向上的闭合箭头
            icon: new BMap.Symbol(BMap_Symbol_SHAPE_FORWARD_CLOSED_ARROW, {
                scale: 1.5,
                strokeWeight: 1,
                rotation: data[data.length - 1].vESselHead,//顺时针旋转30度
                fillColor: 'red',
                fillOpacity: 0.8
            })
        });
        map.addOverlay(vectorFCArrow);

        var temp = '<table style="font-size: 13px;text-align: left" class="map-table">' +
            '<tr><td>' + ES.msg.get('call_sign') + '：{{{callNo}}}</td><td>' + ES.msg.get('bow_to') + '：{{{vESselHead}}}℃</td></tr>' +
            '<tr><td>MMSI：{{{mmsi}}}</td><td>' + ES.msg.get('track_direction') + '：{{{vESselCourse}}}℃</td></tr>' +
            '<tr><td>IMO：{{{imo}}}</td><td>' + ES.msg.get('speed') + '：{{{vESselSpeed}}}kn</td></tr>' +
            '<tr><td>' + ES.msg.get('carrier') + '：{{{company}}}  </td><td>' + ES.msg.get('latitude') + '：{{{shipLatitude}}}</td></tr>' +
            '<tr><td>' + ES.msg.get('english_name') + '：{{{nameEn}}}    </td><td>' + ES.msg.get('longitude') + '：{{{shipLongitude}}}</td></tr>' +
            '<tr><td> ' + ES.msg.get('chinESe_name') + '：{{{nameCn}}}</td><td>' + ES.msg.get('fnd') + '：{{{etaPortName}}}</td></tr>' +
            '<tr><td>' + ES.msg.get('beam') + '：{{{width}}}m      </td><td>' + ES.msg.get('last_time') + '：{{{vESselPositionTime}}}</td></tr>' +
            '<tr><td>  ' + ES.msg.get('ship_length') + '：{{{length}}}m</td></tr>' +
            '</table>'

        var infoWindow = new BMap.InfoWindow(Handlebars.compile(temp)(ES.util.merge(rES, data[data.length - 1])), {
            minWidth: 300,     // 信息窗口宽度
            minHeight: 140,     // 信息窗口高度
            enableMESsage: false//设置允许信息窗发送短息
        });  // 创建信息窗口对象
        map.openInfoWindow(infoWindow, currentPoint); //开启信息窗口
        vectorFCArrow.addEventListener("click", function () {
            map.openInfoWindow(infoWindow, currentPoint);
        })

        var middlePoint = pointList[Math.floor(data.length / 2)];
        //var opts = {
        //	position :   new BMap.Point(middlePoint.lng,middlePoint.lat+9),    // 指定文本标ox注所在的地理位置
        //	offset   : new BMap.Size(30, -30)    //设置文本偏移量
        //}
        //var label = new BMap.Label("欢迎使用百度地图，<br/>这是一个简单的文本标注哦~", opts);  // 创建文本标注对象
        //label.setStyle({
        //	fontSize : "12px",
        //	height : "100px",
        //	lineHeight : "20px",
        //	fontFamily:"微软雅黑"
        //});
        //map.addOverlay(label);

        //fromMarker.addEventListener("click", function(){
        //	var opts = {
        //		width : 200,     // 信息窗口宽度
        //		height: 100,     // 信息窗口高度
        //		title : "测试标题" , // 信息窗口标题
        //		enableMESsage:false//设置允许信息窗发送短息
        //	}
        //	var infoWindow = new BMap.InfoWindow("测试<div style='color: red'>信息</div>", opts);  // 创建信息窗口对象
        //	map.openInfoWindow(infoWindow,fromPoint); //开启信息窗口
        //});
        map.centerAndZoom(middlePoint, 5);
        map.enablEScrollWheelZoom();
        var polyline = new BMap.Polyline(pointList);
        map.addOverlay(polyline);
        window.trackingCallback = null
        delete window.trackingCallback
    }
}
ES.ui.newMap = function (el, rESult) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=GOEGRcwYZBAXOlU7a0bwf9DV&callback=trackingCallback";
    document.body.appenEShild(script);
    var data = rESult.movements;
    var rES = rESult.vESselTraceInfoDto

    window.trackingCallback = function () {
        //坐标转换完之后的回调函数
        var translateCallback = function (data) {
            if (data.status === 0) {
                var currentPoint = data.points[0];
                var map = new BMap.Map(el);
                var vectorFCArrow = new BMap.Marker(new BMap.Point(currentPoint.lng - 0.01, currentPoint.lat), {
                    // 初始化方向向上的闭合箭头
                    icon: new BMap.Symbol(BMap_Symbol_SHAPE_FORWARD_CLOSED_ARROW, {
                        scale: 1.5,
                        strokeWeight: 1,
                        rotation: rES.heading,//顺时针旋转30度
                        fillColor: 'red',
                        fillOpacity: 0.8
                    })
                });
                map.addOverlay(vectorFCArrow);
                var temp = '<table style="font-size: 13px;text-align: left" class="map-table">' +
                    '<tr><td>' + ES.msg.get('english_name') + '：{{{name}}} </td><td>MMSI：{{{MMSI}}}</td></tr>' +
                    '<tr><td> ' + ES.msg.get('chinESe_name') + '：{{{cnName}}}</td><td>IMO：{{{IMO}}}</td></tr>' +
                    '<tr><td>' + ES.msg.get('call_sign') + '：{{{callSign}}}</td><td>' + ES.msg.get('latitude') + '：{{{lat}}}</td></tr>' +
                    '<tr><td>' + ES.msg.get('nation_owner') + '：{{{nationAndOwner}}}  </td><td>' + ES.msg.get('longitude') + '：{{{lon}}}</td></tr>' +
                    '<tr><td>' + ES.msg.get('vESsel_type') + '：{{{type}}}    </td><td>' + ES.msg.get('heading_course') + '：{{{headingAnESourse}}}</td></tr>' +
                    '<tr><td> ' + ES.msg.get('status_speed') + '：{{{statusAndSpeed}}}</td><td>' + ES.msg.get('length_beam') + '：{{{lengthAndBeam}}}</td></tr>' +
                    '<tr><td>' + ES.msg.get('fnd') + '：{{{dESt}}}      </td><td>' + ES.msg.get('eta') + '：{{{ETA}}}</td></tr>' +
                    '<tr><td>' + ES.msg.get('draught') + '：{{{draught}}}      </td><td>' + ES.msg.get('last_time') + '：{{{lastTime}}}</td></tr>' +
                    '<tr><td>' + ES.msg.get('gross_ton') + '：{{{grossTon}}}      </td><td>' + ES.msg.get('load_ton') + '：{{{loadTon}}}</td></tr>' +
                    '<tr><td>' + ES.msg.get('net_ton') + '：{{{netTon}}}      </td><td>' + ES.msg.get('build_time') + '：{{{buildTime}}}</td></tr>' +
                    '</table>'

                var infoWindow = new BMap.InfoWindow(Handlebars.compile(temp)(rES, {
                    minWidth: 300,     // 信息窗口宽度
                    minHeight: 140,     // 信息窗口高度
                    enableMESsage: false//设置允许信息窗发送短息
                }));  // 创建信息窗口对象
                map.openInfoWindow(infoWindow, currentPoint); //开启信息窗口
                vectorFCArrow.addEventListener("click", function () {
                    map.openInfoWindow(infoWindow, currentPoint);
                })

                map.centerAndZoom(currentPoint, 6);
                map.enablEScrollWheelZoom();
                window.trackingCallback = null
                delete window.trackingCallback
            }
        }
        var convertor = new BMap.Convertor();
        var pointArr = [];
        pointArr.push(new BMap.Point(rES.lonConverted, rES.latConverted));
        convertor.translate(pointArr, 1, 5, translateCallback)
    }
}


ES.ui.slider = function (id, itemWidth, itemHeight, tailOffset, transType) {
    if (!transType) {
        transType = 'move'
    }
    var ret = {}
    var div = ES.get(id)
    if (!itemWidth) {
        itemWidth = div.width()
    }
    if (!itemHeight) {
        itemHeight = div.height()
    }
    if (!tailOffset) {
        tailOffset = 0
    }
    var itemCount = div.children('.slider-inner').children('.slider-tab').length
    ret.id = id
    ret.width = itemWidth
    ret.height = itemHeight
    ret.offset = tailOffset
    ret.transType = transType
    ret.el = div
    ret.rESize = function (width, height) {
        var div = this.el
        var itemHeight = height ? height : this.height
        var itemWidth = width ? width : this.width
        this.itemWidth = itemWidth
        div.css({
            'height': itemHeight + 'px'
        })
        ES.get(id + ' .slider-img').css({
            'height': itemHeight + 'px'
        })
        var itemCount = div.children('.slider-inner').children('.slider-tab').css({
            'width': itemWidth + 'px'
        }).length
        width = itemCount * itemWidth
        div.children('.slider-inner').css({
            'width': width + 'px'
        })
        div.children('.slider-controller').css({
            'margin-top': 0 - (itemHeight / 4 * 3) + 'px'
        }).children('span').css({
            'line-height': itemHeight / 2 + 'px'
        })
    }
    ret.rESize()

    var pagES = []
    for (var i = 0; i < itemCount; i++) {
        pagES.push('<span class="slider-selector">&nbsp;</span>')
    }
    div.children('.slider-pagES').html(pagES.join(''))
    ES.get(id + ' .slider-selector').eq(0).addClass('slider-selected')

    var intveral = null
    var time_span = 5000
    var duration = 'right'
    ret.move = function (index) {
        var itemWidth = this.itemWidth
        if (transType == 'move') {
            div.children('.slider-inner').animate({
                'margin-left': (0 - index) * itemWidth + 'px'
            })
        }
        else if (transType == 'fade') {
            div.children('.slider-inner').fadeOut(function () {
                div.children('.slider-inner').css({
                    'margin-left': (0 - index) * itemWidth + 'px'
                }).fadeIn()
            })
        }
        ES.get(id + ' .slider-selector').removeClass('slider-selected').eq(index).addClass('slider-selected')
        intervelSpan()
    }
    var current = 0
    var total = itemCount - 1
    ES.get(id + ' .slider-left').click(function (e) {
        if (current > 0) {
            current--
            ret.move(current)
            duration = 'left'
        }
        e.preventDefault()
        return true
    })
    ES.get(id + ' .slider-right').click(function (e) {
        if (current + tailOffset < total) {
            current++
            ret.move(current)
            duration = 'right'
        }
        e.preventDefault()
        return true
    })
    ES.get(id + ' .slider-selector').click(function (e) {
        var index = ES.get(this).index()
        current = index
        ret.move(current)
        e.preventDefault()
        return false
    })
    var scroll = function () {
        if (duration == 'left') {
            if (current > 0) {
                current--
                ret.move(current)
            } else {

                duration = 'right'
            }
        }
        else if (duration == 'right') {
            if (current + tailOffset < total) {
                current++
                ret.move(current)
            } else {
                duration = 'left'
            }
        }
        intervelSpan()
    }
    var intervelSpan = function () {
        if (intveral != null) {
            clearTimeout(intveral)
            intveral = null
        }
        intveral = setTimeout(scroll, time_span)
    }
    intervelSpan()
    return ret
}

ES.ui.initSlider = function (id, itemWidth, itemHeight, tailOffset, transType) {
    return ES.ui.slider(id, itemWidth, itemHeight, tailOffset, transType)
}

// 只适用于客户资料维护页面
ES.ui.table_form = function (config) {
    var ES_table_form = function (config) {
        config = config || {}
        if (!config.el) {
            return
        }
        this.id = config.el
        this.el = $('#' + this.id)
        this.heads = config.heads || []
        this.headsLen = this.heads.length
        this.items = config.items || []

        this.init = function () {
            var thList = []
            thList.push('<thead><tr>')
            for (var i = 0; i < this.headsLen; i++) {
                if (i != this.headsLen - 1) {
                    thList.push('<th>' + this.heads[i] + '</th>')
                } else {
                    thList.push('<th class="oper-th">' + this.heads[i] + '</th>')
                }
            }
            thList.push('</tr></thead><tbody></tbody>')
            this.el.html(thList.join(''))
        }
        this.add_row = function (rowData) {
            if (this.el.find('thead').length === 0) {
                this.init()
            } else if (this.el.find('tbody tr').length === 0) {
                this.el.find('thead').show()
            }
            var tdList = []
            if (rowData) {
                tdList.push('<tr data-value="' + rowData.id + '">')
                for (var i = 0, len = this.headsLen - 1; i < len; i++) {
                    tdList.push('<td><input type="text" value="' + formatEmptyVal(rowData[this.items[i]['attr']]) + '"/></td>')
                }
            } else {
                tdList.push('<tr>')
                for (var i = 0, len = this.headsLen - 1; i < len; i++) {
                    tdList.push('<td><input type="text"/></td>')
                }
            }
            tdList.push('<td><a class="tr-delete">删除</a></td>')
            tdList.push('</tr>')

            this.el.find('tbody').append(tdList.join(''))
        }
        this.set_value = function (data) {
            data = data || []
            for (var i = 0, len = data.length; i < len; i++) {
                this.add_row(data[i])
            }
            /*if (data.length === 0){
             this.add_row()
             }*/
        }
        this.delete_row = function (targetTr) {
            targetTr.remove()
            // 如果表格中没有内容， 隐藏表头
            //if(this.el.find('tbody tr').length === 0) {
            //	this.el.find('thead').hide()
            //}
        }
        this.get_value = function () {
            var trList = this.el.find('tbody tr')
            var iputList,
                rESult,
                obj
            rESult = []
            $.each(trList, function (_, trObj) {
                obj = {}
                obj.id = $(trObj).data().value
                iputList = $(trObj).find('input')
                $.each(iputList, function (index, input) {
                    obj[config.items[index]['attr']] = $(input).val()
                })
                rESult.push(obj)
            })
            return rESult
        }

        /*
         * val： 输入框中的值
         * index：该输入框在一行中的索引
         * valueArray: 二维数组
         */
        this.valueUnique = function (val, index, valueArray) {
            var rowVal

            for (var i = 0, len = valueArray.length; i < len; i++) {
                rowVal = valueArray[i]
                if (val == rowVal[index]) {
                    return false
                }
            }
            return true
        }

        this.setMsg = function (target, msg) {
            target.addClass('error_frame')
            $('.popup-error').html('<i class="fa fa-timES-circle"></i> ' + msg).show().parent().show()
        }

        this.clear_validate = function () {
            $('.popup-error').html('').hide()
            this.el.find('.error_frame').removeClass('error_frame')
        }

        this.validate = function (couldDuplicate) {
            var trArray,
                inputArray,
                valueArray,
                rowVal,
                val

            // 表格中的值以二维数组存放
            valueArray = []
            trArray = this.el.find('tbody tr')
            for (var i = 0, trLen = trArray.length; i < trLen; i++) {
                inputArray = $(trArray[i]).find('input')
                rowVal = []
                for (var j = 0, inputLen = inputArray.length; j < inputLen; j++) {
                    var inputObj = $(inputArray[j])
                    val = $.trim(inputObj.val())
                    if (this.items[j].nonEmpty && val == '') {
                        this.setMsg(inputObj, ES.msg.get('non_empty'))
                        return false
                    }
                    if (this.items[j].unique && !this.valueUnique(val, j, valueArray) && !couldDuplicate) {
                        this.setMsg(inputObj, this.heads[j] + '重复')
                        return false
                    }
                    if (this.items[j].validate) {
                        var input = ES.get('#tableConsigneeForm tbody tr:eq(' + i + ')').find('td:eq(' + j + ')').find('input')
                        var value = input.val()
                        if (!this.items[j].validate(value)) {
                            input.addClass('error_frame')
                            return false
                        }
                    }

                    rowVal.push(val)
                }
                valueArray.push(rowVal)
            }
            return true
        }

        $(this.el).on('click', '.tr-delete', function () {
            if (config.deleteHandler) {
                config.deleteHandler($(this).parent().parent())
            }
        })

        function formatEmptyVal(val) {
            if (typeof val === 'undefined') {
                return ''
            }
            return val
        }

        this.init()
    }
    var ret = new ES_table_form(config)
    ES.ui.add(ret.id, ret)
    return ret
}

ES.mvx = {}
ES.mvx.comps = {}
ES.mvx.get = function (id) {
    return ES.mvx.comps[id]
}
ES.mvx.add = function (comp) {
    ES.mvx.comps[comp.id] = comp
}
ES.mvx.remove = function (id) {
    ES.mvx.comps[id] = undefined
    ES.mvx.comps[id] = null
    delete ES.mvx.comps[id]
}
ES.mvx.validate = function () {
    var rES = true
    var map = ES.mvx.comps
    for (var i in map) {
        if (map.hasOwnProperty(i) && map[i].validate) {
            var r = map[i].validate()
            rES = r && rES
        }
    }
    return rES
}
ES.mvx.data = function () {
    var ret = {}
    var map = ES.mvx.comps
    for (var i in map) {
        if (map.hasOwnProperty(i) && map[i].get_value && map[i].id) {
            ret[map[i].id] = map[i].get_value()
        }
    }
    return ret
}
ES.mvx.disable = function () {
    var map = ES.mvx.comps
    for (var i in map) {
        if (map.hasOwnProperty(i) && map[i].disable) {
            map[i].disable()
        }
    }
}
ES.mvx.enable = function () {
    var map = ES.mvx.comps
    for (var i in map) {
        if (map.hasOwnProperty(i) && map[i].enable) {
            map[i].enable()
        }
    }
}

module.exports = ES;