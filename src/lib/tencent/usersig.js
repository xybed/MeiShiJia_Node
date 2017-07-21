/**
 * Created by Administrator on 2017/7/20.
 */
'use strict';

/**
 * 根据腾讯im的文档，生成用户签名sig的方法
 * 私钥和公钥是腾讯提供的，方法也是从官方文档中copy下来的
 * 根据实验结果发现，每次加密的sig不同，这跟sig的有效期限也是有关的
 * expire_after可以指定sig的有效期限
 * 每次执行都相当于重新生成一个签名sig
 * 机制：后台不保存sig，由前端自己保存，前端请求login时再重新生成一次
 */

var sig = require('./TLSAPI');
const timConfig = require('./tim-config');

var config = {
    "sdk_appid": timConfig.sdk_appid,
    "expire_after": 15 * 24 * 3600,
    "private_key": "private_key",
    "public_key": "public_key"
}

var sig = new sig.Sig(config);

function genSig(principal_id) {
    return sig.genSig(principal_id);
}

module.exports = genSig;