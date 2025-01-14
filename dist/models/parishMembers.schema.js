"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/ParishMember.ts
const mongoose_1 = require("mongoose");
// Create a Schema corresponding to the document interface.
const ParishMemberSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    houseName: { type: String, required: true },
    image: { type: String, optional: true },
    phoneNumber: { type: String, optional: true },
    category: {
        type: String,
        required: true,
        enum: ['spiritual-leaders', 'parish-council', 'eminent-personalities', 'parish-members']
    },
});
// Create a Model.
const ParishMember = (0, mongoose_1.model)('ParishMember', ParishMemberSchema);
exports.default = ParishMember;
