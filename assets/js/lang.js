window.onload = function() {
    var selectLang = document.getElementById('lang-select'); // 获取下拉菜单

    fetch('assets/lang/lang.json') // 替换为你的JSON文件的路径
        .then(response => response.json())
        .then(data => {
            selectLang.addEventListener('change', function() { // 当用户更改下拉菜单的选项时
                var userLang = selectLang.value; // 获取用户选择的语言
                changeLanguage(userLang, data);
            });

            // 获取URL参数
            var urlParams = new URLSearchParams(window.location.search);
            var langParam = urlParams.get('lang');

            // 如果URL参数中有lang且其值在我们的语言选项中，我们使用它作为默认语言
            if (langParam && (langParam === 'en' || langParam === 'zh')) {
                selectLang.value = langParam;
            }

            // 触发一次change事件，以便在页面加载时设置正确的语言
            var event = new Event('change');
            selectLang.dispatchEvent(event);
        });

    function changeLanguage(lang, data) {
        var elements = document.querySelectorAll('[data-lang-text]');

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var key = element.getAttribute('data-lang-text');

            if (data[lang] && data[lang][key]) {
                element.textContent = data[lang][key];
            } else {
                alert('翻译不匹配: ' + key);
                return;
            }
        }

        var myDiv = document.getElementById('join-group');
        var links = myDiv.getElementsByTagName('a');

        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var key = link.getAttribute('data-lang-href');

            if (key === null) {
                alert('找不到链接的"data-lang-href"属性: ' + link.outerHTML);
                continue;
            }

            if (data[lang] && data[lang][key]) {
                link.href = data[lang][key];
            } else {
                alert('链接不匹配: ' + key);
                return;
            }
        }
        // 处理所有的输入框和文本区域
        var inputElements = document.querySelectorAll('input[data-lang-placeholder], textarea[data-lang-placeholder]');

        for (var i = 0; i < inputElements.length; i++) {
            var inputElement = inputElements[i];
            var keyPlaceholder = inputElement.getAttribute('data-lang-placeholder');
            var keyDataError = inputElement.getAttribute('data-lang-data-error');

            if (keyPlaceholder !== null && data[lang] && data[lang][keyPlaceholder]) {
                inputElement.setAttribute('placeholder', data[lang][keyPlaceholder]);
            }

            if (keyDataError !== null && data[lang] && data[lang][keyDataError]) {
                inputElement.setAttribute('data-error', data[lang][keyDataError]);
            }
        }

        // 处理所有的svg
        var svgElements = document.querySelectorAll('[data-lang-svg]');

        for (var i = 0; i < svgElements.length; i++) {
            var svgElement = svgElements[i];
            var key = svgElement.getAttribute('data-lang-svg');

            if (data[lang] && data[lang][key]) {
                svgElement.innerHTML = data[lang][key];
            } else {
                alert('SVG 不匹配: ' + key);
                return;
            }
        }
    }
}
