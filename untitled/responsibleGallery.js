/*반응형갤러리를 위한 스크립트
 *
 *
 * */
(function ($) {
    $.fn.boxResponsible = function (opts) {
        var getWindowSize, getContentsWidth, doCalculateSize;
        var option,itemCnt, new_width;
        var layout = this;

        option = $.extend({}, $.fn.boxResponsible.default, opts);

        getWindowSize = function () {
            return {width: window.innerWidth, height: window.innerHeight}
        }
        getContentsWidth = function () {
            //사이즈 계산시 참조할 엘리멘트 넓이값 반환(패팅,마진,보더 미포함)
            return $(option.parentElement).width();
        }
        doCalculateSize = function () {
            itemCnt = getContentsWidth() > 720 ? option.itemCntDefault : getContentsWidth() > 480 ? option.itemCnt720 : option.itemCnt480;
            var width_withoutTotalMargin = (getContentsWidth() - (itemCnt - 1) * 12) / itemCnt;//컨텐츠 넓이 - 전체 마진(아이템 사이의 마진)
            new_width = width_withoutTotalMargin > option.liMaxWidth ? option.liMaxWidth : width_withoutTotalMargin;//너무 커지지 않게 parent에 max-width있으면 상관없음
            new_width = option.hasBorder? new_width -2: new_width;//보더값 계산에 반영

            layout.each(function (index, item) {
                if(new_width == -1) return;
                var item = $(item);
                item.innerWidth(Math.floor(new_width));
                item.css("margin", Number(option.margin));//reset margin

                switch (itemCnt) {//매 줄의 첫째와 마지막은 좌우로 붙이기 위해
                    case 4:
                        if (index % 4 == 0) {
                            item.css("margin-left", 0);
                        } else if ((index + 1) % 4 == 0) {
                            item.css("margin-right", 0)
                        }
                        break;
                    case 3:
                        if (index % 3 == 0) {
                            item.css("margin-left", 0);
                        } else if ((index + 1) % 3 == 0) {
                            item.css("margin-right", 0)
                        }
                        break;
                    case 2:
                        if (index % 2 == 0) {
                            item.css("margin-left", 0);
                        } else if ((index + 1) % 2 == 0) {
                            item.css("margin-right", 0)
                        }
                        break;
                }

            });
        }
        window.addEventListener("resize", doCalculateSize);
        doCalculateSize(option);
        return	this;

    };
    $.fn.boxResponsible.default = {
        margin:6,//아이템 마진
        itemCnt720:3,//720일때 표시할 아이템
        itemCnt480:2,//480일때 표시할 아이템
        itemCntDefault:4,//표시할 아이템 기본값
        liMaxWidth:240,//아이템 최대넓이
        hasBorder:true,//보더값 반영
        parentElement:".contents_box"//사이즈 변경값 참조할 엘리멘트
    }
}(jQuery));