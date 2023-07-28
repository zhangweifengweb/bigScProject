import axios from 'axios';
window.$axios = axios.create({
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    transformRequest: [function (data) {
        return JSON.stringify(data)
    }],
    transformResponse: [function (res) {
        // $app.$Spin.hide();
        // try {
        //     res = JSON.parse(res);
        // } catch (error) {
        //     console.log(error);
        // }
        // ~'-9,-8,-7'.indexOf(res.statusCode) && $app.$Modal.error({
        //     title: '操作提示',
        //     content: res.msg,
        //     onOk: () => {
        //         $channel.$emit('LoginOutEvent')
        //     }
        // })
        
        return res;
    }]
});

