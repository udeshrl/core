/*
 Copyright [2016] [Relevance Lab]

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

var logger = require('_pr/logger')(module);
var mongoose = require('mongoose');
var BaseAuditTrail = require('./base-audit-trail.js');
var AuditTrail = require('./audit-trail.js');

var BotAuditTrailSchema = new BaseAuditTrail({
    auditTrailConfig: {
        id: {
            type: String,
            trim:true
        },
        name: {
            type: String,
            trim:true
        },
        type: {
            type: String,
            unique: true,
            trim:true
        },
        description:{
            type: String,
            trim:true
        },
        category:{
            type: String,
            trim:true
        }
    }
});

BotAuditTrailSchema.statics.createNew = function(botAuditTrail,callback){
    var BotAuditTrail = new BotAuditTrail(botAuditTrail);
    BotAuditTrail.save(function(err, data) {
        if (err) {
            logger.error("createNew Failed", err, data);
            return;
        }
        callback(null,data);
    });
};

var BotAuditTrail = AuditTrail.discriminator('botAuditTrail', BotAuditTrailSchema);
BotAuditTrail
