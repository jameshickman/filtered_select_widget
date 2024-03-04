function _filtered_select(el_container) {
    el_container.classList.add('select-widget__container');
    let has_groups = false;
    let opened = false;
    let options = [];
    let selected = null;
    const el_select = el_container.querySelector('SELECT');
    el_select.style.display = 'none';
    let els_optgroups = [];
    const el_display = document.createElement('BUTTON');
    el_display.classList.add('select-widget__display-current');
    if (el_select.selectedIndex >= 0) {
        el_display.innerText = el_select.options[el_select.selectedIndex].text;
    }
    el_container.appendChild(el_display);
    const el_down_chevron_container = document.createElement('DIV');
    el_down_chevron_container.classList.add('select-widget__chevron-container');
    const el_down_chevron = document.createElement('DIV');
    el_down_chevron.classList.add('select-widget__chevron');
    el_down_chevron_container.appendChild(el_down_chevron);
    el_container.appendChild(el_down_chevron_container);
    const widget = build_widget();

    function group_test() {
        els_optgroups = el_select.querySelectorAll('OPTGROUP');
        if (els_optgroups !== null && els_optgroups.length > 0) {
            has_groups = true;
        }
        else {
            has_groups = false;
        }
    }

    function load_options_data() {
        options = [];
        if (has_groups) {
            for (let i = 0; i < els_optgroups.length; i++) {
                const group_name = els_optgroups[i].label;
                const els_options = els_optgroups[i].querySelectorAll('OPTION');
                if (els_options.length > 0) {
                    const optgroup = {
                        'label': group_name,
                        'options': []
                    };
                    for (let j = 0; j < els_options.length; j++) {
                        optgroup.options.push(
                            {
                                'label': els_options[j].innerText,
                                'value': els_options[j].value
                            }
                        );
                    }
                    options.push(optgroup);
                }
            }
        }
        else {
            const el_options = el_select.querySelectorAll('OPTION');
            for (let i = 0; i < el_options.length; i++) {
                options.push(
                    {
                        'label': el_options[i].innerText,
                        'value': el_options[i].value
                    }
                );
            }
        }
    }

    function activate_dropdown(e) {
        widget.widget.style.display = 'block';
        widget.search.value = '';
        widget.search.focus();
        build_results(options);
        opened = true;
        e.stopPropagation();
        e.preventDefault();
    }

    function build_results(results) {
        if (el_select.selectedIndex >= 0) {
            selected = el_select.options[el_select.selectedIndex].value;
        }
        widget.result.innerHTML = '';
        if (has_groups) {
            for (let i = 0; i < results.length; i++) {
                const group_name = results[i].label;
                const el_group_container = document.createElement('DIV');
                const el_group_title = document.createElement('DIV');
                el_group_title.classList.add('select-widget__group-title');
                el_group_title.innerText = group_name;
                el_group_container.appendChild(el_group_title);
                const el_options_container = document.createElement('DIV');
                el_group_container.appendChild(el_options_container);
                for (let j = 0; j < results[i].options.length; j++) {
                    const el_option = document.createElement('BUTTON');
                    el_option.classList.add('select-widget__group-item');
                    el_option.innerText = results[i].options[j].label;
                    el_option.dataset['value'] = results[i].options[j].value;
                    if (results[i].options[j].value == selected) {
                        el_display.innerText = results[i].options[j].label;
                        el_option.classList.add('select-widget__item__selected');
                    }
                    el_options_container.appendChild(el_option);
                }
                widget.result.appendChild(el_group_container);
            }
            widget.section_label.style.display = 'block';
            widget.section_label.innerText = find_group_name();
        }
        else {
            for (let i = 0; i < results.length; i++) {
                const el_option = document.createElement('BUTTON');
                el_option.classList.add('select-widget__item');
                el_option.innerText = results[i].label;
                el_option.dataset['value'] = results[i].value;
                if (results[i].value == selected) {
                    el_display.innerText = results[i].label;
                    el_option.classList.add('select-widget__item__selected');
                }
                widget.result.appendChild(el_option);
                widget.section_label.style.display = 'none';
            }
        }
        const el_selected_item = widget.result.querySelector('.select-widget__item__selected');
        if (el_selected_item) {
            let backoff = 
                el_selected_item.offsetTop 
                - el_selected_item.clientHeight
                - (widget.result.clientHeight / 2);
            widget.result.scrollTop = backoff;
        }
    }

    function search_changed(e) {
        let term = widget.search.value.toLowerCase();
        let filtered = [];
        widget.result.innerHTML = '';
        if (has_groups) {
            for (let i = 0; i < options.length; i++) {
                const group_lbl = options[i].label;
                let group_matching = [];
                for (let j = 0; j < options[i].options.length; j++) {
                    if (term == '' || (options[i].options[j].label.toLowerCase().indexOf(term) !== -1)) {
                        group_matching.push(options[i].options[j]);
                    }
                }
                if (group_matching.length > 0) {
                    filtered.push(
                        {
                            'label': group_lbl,
                            'options': group_matching
                        }
                    );
                }
            }
            build_results(filtered);
        }
        else {
            for (let i = 0; i < options.length; i++) {
                if (term == '' || (options[i].label.toLowerCase().indexOf(term) !== -1)) {
                    filtered.push(options[i]);
                }
            }
            build_results(filtered);
        }
    }

    function result_clicked(e) {
        const val = e.target.dataset.value;
        const txt = e.target.innerText;
        if (val !== undefined) {
            el_select.value = val;
            el_display.innerText = txt;
        }
        widget.widget.style.display = 'none';
        opened = false;
        // Simulate the Change event and dispatch it from the real SELECT
        if ("createEvent" in document) {
            const evt = document.createEvent('HTMLEvents');
            evt.initEvent("change", false, true);
            el_select.dispatchEvent(evt);
        }
        else {
            el_select.fireEvent("onchange");
        }
    }

    function background_clicked(e) {
        if (opened) {
            widget.widget.style.display = 'none';
            opened = false;
        }
    }

    function widget_clicked(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    // Build the widget
    function build_widget() {
        const el_widget = document.createElement('DIV');
        el_widget.classList.add('select-widget__dropdown-container');
        el_widget.style.display = 'none';
        const el_close = document.createElement('BUTTON');
        el_close.classList.add('select-widget__dropdown-close');
        const el_search = document.createElement('INPUT');
        el_search.type = 'TEXT';
        el_search.classList.add('select-widget__input-text');
        el_search.placeholder = "Search...";
        el_search.addEventListener('keyup', search_changed);
        const el_section_label = document.createElement('DIV');
        el_section_label.classList.add('select-widget__group-label');
        el_section_label.style.display = 'none';
        const el_results = document.createElement('DIV');
        el_results.classList.add('select-widget__results');
        el_results.addEventListener('click', result_clicked);
        el_widget.appendChild(el_close);
        el_widget.appendChild(el_search);
        el_widget.appendChild(el_section_label);
        el_widget.appendChild(el_results);
        return {
            'widget': el_widget,
            'search': el_search,
            'section_label': el_section_label,
            'result': el_results,
            'close': el_close
        };
    }

    function find_group_name() {
        const scroll_pos = widget.result.scrollTop;
        const els_groups = widget.result.children;
        for (let i = 0; i < els_groups.length; i++) {
            if (scroll_pos >= els_groups[i].offsetTop && scroll_pos <= els_groups[i].offsetTop + els_groups[i].clientHeight) {
                return els_groups[i].children[0].innerText;
            }
        }
        return els_groups[0].children[0].innerText;
    }

    function result_scrolled(e) {
        if (has_groups) {
            widget.section_label.innerText = find_group_name();
        }
    }

    group_test();
    load_options_data();
    el_container.appendChild(widget.widget);

    el_display.addEventListener('click', activate_dropdown);
    el_down_chevron.addEventListener('click', activate_dropdown);

    document.addEventListener('click', background_clicked);
    widget.widget.addEventListener('click', widget_clicked);
    widget.close.addEventListener('click', function(e) {
        widget.widget.style['display'] = 'none';
    });

    document.addEventListener('keyup', function(e){
        if (e.which == 27 || e.key == "Escape") {
            background_clicked(e);
        }
    });

    widget.result.addEventListener('scroll', result_scrolled);

    this.reload = function() {
        el_display.innerText = '';
        group_test();
        load_options_data();
        build_results(options);
    }

    el_select.widget = this;

    return this;
}