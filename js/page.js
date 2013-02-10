define(['data'], function (dataManager) {
    return {
        init: function (vm) {
            vm.nextPage = function () {
                var $index = vm.currentPage();
                if ($index < vm.pageList().length - 1) {
                    vm.currentPage($index + 1);
                }
            };
            vm.prevPage = function () {
                var $index = vm.currentPage();
                if ($index > 0) {
                    vm.currentPage($index - 1);
                }
            };

            vm.addPage = function () {
                var $index;
                var slideList;
                var slide;
                var sid = (new Date).valueOf();

                $index = vm.currentPage();
                vm.pageList.splice($index + 1, 0, {sid: sid, title: 'new slide'});

                slideList = dataManager.getSlideList();
                slide = {
                        sid: sid,
                        template: 'normal', layout: 'normal',
                        items: {
                            title: {type: 'text', value: ''},
                            content: {type: 'text', value: ''}
                        }
                    };
                slideList.splice($index + 1, 0, slide);

                vm.currentPage($index + 1);

                dataManager.save();
            };
            vm.clonePage = function () {
                var $index;
                var page;
                var slideList;
                var slide;
                var sid = (new Date).toString();

                $index = vm.currentPage();
                page = JSON.stringify(vm.pageList.slice($index, $index + 1)[0]);
                page.sid = sid;
                page = JSON.parse(page);
                vm.pageList.splice($index + 1, 0, page);

                slideList = dataManager.getSlideList();
                slide = JSON.stringify(dataManager.getSlide($index));
                slide.sid = sid;
                slide = JSON.parse(slide);
                slideList.splice($index + 1, 0, slide);

                vm.currentPage($index + 1);

                dataManager.save();
            };
            vm.removePage = function () {
                var $index;
                var slideList;

                $index = vm.currentPage();
                if (vm.pageList().length == 1) {
                    return;
                }
                if ($index == vm.pageList().length - 1) {
                    vm.currentPage($index - 1);
                }
                vm.pageList.splice($index, 1);

                slideList = dataManager.getSlideList();
                slideList.splice($index, 1);
                dataManager.save();
            };
            vm.moveUpPage = function () {
                var $index;
                var slideList;
                var page;
                var slide;

                $index = vm.currentPage();
                slideList = dataManager.getSlideList();

                if ($index > 0) {
                    page = vm.pageList.splice($index, 1)[0];
                    vm.pageList.splice($index - 1, 0, page);

                    slide = slideList.splice($index, 1)[0];
                    slideList.splice($index - 1, 0, slide);

                    vm.currentPage($index - 1);

                    dataManager.save();
                }
            };
            vm.moveDownPage = function () {
                var $index;
                var slideList;
                var page;
                var slide;

                $index = vm.currentPage();
                slideList = dataManager.getSlideList();

                if ($index < vm.pageList().length - 1) {
                    page = vm.pageList.splice($index, 1)[0];
                    vm.pageList.splice($index + 1, 0, page);

                    slide = slideList.splice($index, 1)[0];
                    slideList.splice($index + 1, 0, slide);

                    vm.currentPage($index + 1);

                    dataManager.save();
                }
            };
        }
    };
});