/**
 * Created by Administrator on 2017/7/21.
 */
'use strict';

const https = require('https');
const timConfig = require('../lib/tencent/tim-config');

function imRESTApi(rest, usersig, data) {
    data = JSON.stringify(data);

    let options = {
        host: 'console.tim.qq.com',
        path: '/v4/'+rest.servicename+'/'+rest.command+'?usersig='+usersig+'&identifier='+timConfig.admin_identifier+'&sdkappid='+timConfig.sdk_appid+'&contenttype=json',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    let result = {
        ErrorInfo: '',
        ErrorCode: 0
    };

    let reqHttp = https.request(options, function (resHttp) {
        console.log('statusCode: '+resHttp.statusCode);
        resHttp.on('data', function (body) {
            console.log('body: '+body);
            if(!(resHttp.statusCode === 200 && body.ActionStatus === 'OK' && body.ErrorCode === 0)){
                result.ErrorInfo = body.ErrorInfo;
                result.ErrorCode = body.ErrorCode;
            }
            return result;
        });
    });

    reqHttp.write(data);
    reqHttp.end();
}

module.exports = imRESTApi;