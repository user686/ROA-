
import { handleGetUserInfo } from '@/utils/api/agencydesc';
import { Toast } from 'vant';
export default {
    mounted() {

    },
    methods: {
        /**
         * 跳转页面，需要token
         *  */
        $navTo(url) {
            let token = localStorage.getItem('tooltoken')
            if (!token) {
                this.$router.replace('/')
            } else {
                this.$router.push(url)
            }
        },
        /**
         * 返回首页
        */
        backHome() {
            localStorage.removeItem('orderdata')
            this.$router.replace({
                path: '/'
            })
        },
        /**
         * 获取用户信息
        */
        getUserInfo() {
            handleGetUserInfo().then(res => {
                if (res.data) {
                    this.userInfo = res.data[0]
                    this.$store.commit('SetUserinfo', this.userInfo)
                    localStorage.setItem('userinfo', JSON.stringify(this.userInfo))
                } else {
                    localStorage.removeItem('tooltoken')
                    localStorage.removeItem('userinfo')
                }
            })
        },

        setClipdata(data) {
            try {
                navigator.clipboard.writeText(data);
                Toast.success('复制成功')
            } catch (e) {
                const textarea = document.createElement('textarea');
                textarea.setAttribute('readonly', 'readonly');
                textarea.value = data;
                document.body.appendChild(textarea);
                textarea.select();
                if (document.execCommand('copy')) {
                    document.execCommand('copy');
                    Toast.success('复制成功')
                }
                document.body.removeChild(textarea);
            }
        },
    }
}