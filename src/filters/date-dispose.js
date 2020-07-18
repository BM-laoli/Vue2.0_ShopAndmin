import Vue from 'vue';

// 时间过滤器
Vue.filter('format', (value) => {
    const date = new Date(value);

    const y = date.getFullYear();
    const m = (date.getMonth() + 1 + '').padStart(2, '0');
    const d = (date.getDate() + '').padStart(2, '0');
    return `${y}-${m}-${d}`;
});
