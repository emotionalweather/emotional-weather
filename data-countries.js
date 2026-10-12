// ============================================================
//  data-countries.js - 🌍 كل دول العالم (195 دولة)
//  UN member states (193) + Vatican + Palestine = 195
// ============================================================

console.log('🌍 جاري تحميل قاعدة بيانات 195 دولة...');

const ALL_COUNTRIES = [
    // ============================================================
    //  🌍 أفريقيا (54 دولة)
    // ============================================================
    { code:'DZ', iso3:'DZA', ar:'الجزائر', en:'Algeria', flag:'🇩🇿', lat:28.0, lng:1.7, kw:['الجزائر','الجزائر العاصمة','Algeria','Algiers'] },
    { code:'AO', iso3:'AGO', ar:'أنغولا', en:'Angola', flag:'🇦🇴', lat:-11.2, lng:17.9, kw:['أنغولا','Angola','Luanda'] },
    { code:'BJ', iso3:'BEN', ar:'بنين', en:'Benin', flag:'🇧🇯', lat:9.3, lng:2.3, kw:['بنين','Benin','Porto-Novo'] },
    { code:'BW', iso3:'BWA', ar:'بوتسوانا', en:'Botswana', flag:'🇧🇼', lat:-22.3, lng:24.7, kw:['بوتسوانا','Botswana','Gaborone'] },
    { code:'BF', iso3:'BFA', ar:'بوركينا فاسو', en:'Burkina Faso', flag:'🇧🇫', lat:12.4, lng:-1.6, kw:['بوركينا فاسو','Burkina Faso','Ouagadougou'] },
    { code:'BI', iso3:'BDI', ar:'بوروندي', en:'Burundi', flag:'🇧🇮', lat:-3.4, lng:29.9, kw:['بوروندي','Burundi','Bujumbura'] },
    { code:'CV', iso3:'CPV', ar:'الرأس الأخضر', en:'Cabo Verde', flag:'🇨🇻', lat:16.0, lng:-24.0, kw:['الرأس الأخضر','Cabo Verde','Cape Verde'] },
    { code:'CM', iso3:'CMR', ar:'الكاميرون', en:'Cameroon', flag:'🇨🇲', lat:3.8, lng:11.5, kw:['الكاميرون','Cameroon','Yaounde'] },
    { code:'CF', iso3:'CAF', ar:'أفريقيا الوسطى', en:'Central African Republic', flag:'🇨🇫', lat:4.4, lng:18.6, kw:['أفريقيا الوسطى','Central African','Bangui'] },
    { code:'TD', iso3:'TCD', ar:'تشاد', en:'Chad', flag:'🇹🇩', lat:15.5, lng:18.7, kw:['تشاد','Chad','NDjamena'] },
    { code:'KM', iso3:'COM', ar:'جزر القمر', en:'Comoros', flag:'🇰🇲', lat:-11.6, lng:43.3, kw:['جزر القمر','Comoros','Moroni'] },
    { code:'CG', iso3:'COG', ar:'الكونغو', en:'Congo', flag:'🇨🇬', lat:-0.2, lng:15.8, kw:['الكونغو','Congo','Brazzaville'] },
    { code:'CD', iso3:'COD', ar:'الكونغو الديمقراطية', en:'DR Congo', flag:'🇨🇩', lat:-4.0, lng:21.7, kw:['الكونغو الديمقراطية','DR Congo','Kinshasa'] },
    { code:'CI', iso3:'CIV', ar:'ساحل العاج', en:'Ivory Coast', flag:'🇨🇮', lat:7.5, lng:-5.5, kw:['ساحل العاج','Ivory Coast','Cote dIvoire','Abidjan'] },
    { code:'DJ', iso3:'DJI', ar:'جيبوتي', en:'Djibouti', flag:'🇩🇯', lat:11.6, lng:43.1, kw:['جيبوتي','Djibouti'] },
    { code:'EG', iso3:'EGY', ar:'مصر', en:'Egypt', flag:'🇪🇬', lat:26.8, lng:30.8, kw:['مصر','القاهرة','Egypt','Cairo'] },
    { code:'GQ', iso3:'GNQ', ar:'غينيا الاستوائية', en:'Equatorial Guinea', flag:'🇬🇶', lat:1.7, lng:10.3, kw:['غينيا الاستوائية','Equatorial Guinea'] },
    { code:'ER', iso3:'ERI', ar:'إريتريا', en:'Eritrea', flag:'🇪🇷', lat:15.2, lng:39.8, kw:['إريتريا','Eritrea','Asmara'] },
    { code:'SZ', iso3:'SWZ', ar:'إسواتيني', en:'Eswatini', flag:'🇸🇿', lat:-26.5, lng:31.5, kw:['إسواتيني','Eswatini','Swaziland'] },
    { code:'ET', iso3:'ETH', ar:'إثيوبيا', en:'Ethiopia', flag:'🇪🇹', lat:9.1, lng:40.5, kw:['إثيوبيا','Ethiopia','Addis Ababa'] },
    { code:'GA', iso3:'GAB', ar:'الغابون', en:'Gabon', flag:'🇬🇦', lat:-0.8, lng:11.6, kw:['الغابون','Gabon','Libreville'] },
    { code:'GM', iso3:'GMB', ar:'غامبيا', en:'Gambia', flag:'🇬🇲', lat:13.4, lng:-15.3, kw:['غامبيا','Gambia','Banjul'] },
    { code:'GH', iso3:'GHA', ar:'غانا', en:'Ghana', flag:'🇬🇭', lat:7.9, lng:-1.0, kw:['غانا','Ghana','Accra'] },
    { code:'GN', iso3:'GIN', ar:'غينيا', en:'Guinea', flag:'🇬🇳', lat:9.9, lng:-9.7, kw:['غينيا','Guinea','Conakry'] },
    { code:'GW', iso3:'GNB', ar:'غينيا بيساو', en:'Guinea-Bissau', flag:'🇬🇼', lat:11.8, lng:-15.2, kw:['غينيا بيساو','Guinea-Bissau'] },
    { code:'KE', iso3:'KEN', ar:'كينيا', en:'Kenya', flag:'🇰🇪', lat:-0.0, lng:37.9, kw:['كينيا','Kenya','Nairobi'] },
    { code:'LS', iso3:'LSO', ar:'ليسوتو', en:'Lesotho', flag:'🇱🇸', lat:-29.6, lng:28.2, kw:['ليسوتو','Lesotho','Maseru'] },
    { code:'LR', iso3:'LBR', ar:'ليبيريا', en:'Liberia', flag:'🇱🇷', lat:6.4, lng:-9.4, kw:['ليبيريا','Liberia','Monrovia'] },
    { code:'LY', iso3:'LBY', ar:'ليبيا', en:'Libya', flag:'🇱🇾', lat:26.3, lng:17.2, kw:['ليبيا','طرابلس','Libya','Tripoli'] },
    { code:'MG', iso3:'MDG', ar:'مدغشقر', en:'Madagascar', flag:'🇲🇬', lat:-18.8, lng:46.9, kw:['مدغشقر','Madagascar','Antananarivo'] },
    { code:'MW', iso3:'MWI', ar:'مالاوي', en:'Malawi', flag:'🇲🇼', lat:-13.3, lng:34.3, kw:['مالاوي','Malawi','Lilongwe'] },
    { code:'ML', iso3:'MLI', ar:'مالي', en:'Mali', flag:'🇲🇱', lat:17.6, lng:-4.0, kw:['مالي','Mali','Bamako'] },
    { code:'MR', iso3:'MRT', ar:'موريتانيا', en:'Mauritania', flag:'🇲🇷', lat:21.0, lng:-10.9, kw:['موريتانيا','نواكشوط','Mauritania','Nouakchott'] },
    { code:'MU', iso3:'MUS', ar:'موريشيوس', en:'Mauritius', flag:'🇲🇺', lat:-20.3, lng:57.6, kw:['موريشيوس','Mauritius'] },
    { code:'MA', iso3:'MAR', ar:'المغرب', en:'Morocco', flag:'🇲🇦', lat:31.8, lng:-7.1, kw:['المغرب','الرباط','Morocco','Rabat'] },
    { code:'MZ', iso3:'MOZ', ar:'موزمبيق', en:'Mozambique', flag:'🇲🇿', lat:-18.7, lng:35.5, kw:['موزمبيق','Mozambique','Maputo'] },
    { code:'NA', iso3:'NAM', ar:'ناميبيا', en:'Namibia', flag:'🇳🇦', lat:-22.6, lng:17.1, kw:['ناميبيا','Namibia','Windhoek'] },
    { code:'NE', iso3:'NER', ar:'النيجر', en:'Niger', flag:'🇳🇪', lat:17.6, lng:8.1, kw:['النيجر','Niger','Niamey'] },
    { code:'NG', iso3:'NGA', ar:'نيجيريا', en:'Nigeria', flag:'🇳🇬', lat:9.1, lng:8.7, kw:['نيجيريا','Nigeria','Abuja','Lagos'] },
    { code:'RW', iso3:'RWA', ar:'رواندا', en:'Rwanda', flag:'🇷🇼', lat:-1.9, lng:29.9, kw:['رواندا','Rwanda','Kigali'] },
    { code:'ST', iso3:'STP', ar:'ساو تومي', en:'Sao Tome', flag:'🇸🇹', lat:0.2, lng:6.6, kw:['ساو تومي','Sao Tome'] },
    { code:'SN', iso3:'SEN', ar:'السنغال', en:'Senegal', flag:'🇸🇳', lat:14.5, lng:-14.5, kw:['السنغال','Senegal','Dakar'] },
    { code:'SC', iso3:'SYC', ar:'سيشل', en:'Seychelles', flag:'🇸🇨', lat:-4.7, lng:55.5, kw:['سيشل','Seychelles'] },
    { code:'SL', iso3:'SLE', ar:'سيراليون', en:'Sierra Leone', flag:'🇸🇱', lat:8.5, lng:-11.8, kw:['سيراليون','Sierra Leone','Freetown'] },
    { code:'SO', iso3:'SOM', ar:'الصومال', en:'Somalia', flag:'🇸🇴', lat:5.2, lng:46.2, kw:['الصومال','Somalia','Mogadishu'] },
    { code:'ZA', iso3:'ZAF', ar:'جنوب أفريقيا', en:'South Africa', flag:'🇿🇦', lat:-30.6, lng:22.9, kw:['جنوب أفريقيا','South Africa','Pretoria','Johannesburg'] },
    { code:'SS', iso3:'SSD', ar:'جنوب السودان', en:'South Sudan', flag:'🇸🇸', lat:7.9, lng:30.0, kw:['جنوب السودان','South Sudan','Juba'] },
    { code:'SD', iso3:'SDN', ar:'السودان', en:'Sudan', flag:'🇸🇩', lat:15.5, lng:32.5, kw:['السودان','الخرطوم','Sudan','Khartoum'] },
    { code:'TZ', iso3:'TZA', ar:'تنزانيا', en:'Tanzania', flag:'🇹🇿', lat:-6.4, lng:34.9, kw:['تنزانيا','Tanzania','Dodoma'] },
    { code:'TG', iso3:'TGO', ar:'توغو', en:'Togo', flag:'🇹🇬', lat:8.6, lng:0.8, kw:['توغو','Togo','Lome'] },
    { code:'TN', iso3:'TUN', ar:'تونس', en:'Tunisia', flag:'🇹🇳', lat:33.9, lng:9.5, kw:['تونس','Tunisia','Tunis'] },
    { code:'UG', iso3:'UGA', ar:'أوغندا', en:'Uganda', flag:'🇺🇬', lat:1.4, lng:32.3, kw:['أوغندا','Uganda','Kampala'] },
    { code:'ZM', iso3:'ZMB', ar:'زامبيا', en:'Zambia', flag:'🇿🇲', lat:-13.1, lng:27.8, kw:['زامبيا','Zambia','Lusaka'] },
    { code:'ZW', iso3:'ZWE', ar:'زيمبابوي', en:'Zimbabwe', flag:'🇿🇼', lat:-19.0, lng:29.2, kw:['زيمبابوي','Zimbabwe','Harare'] },

    // ============================================================
    //  🌏 آسيا (48 دولة)
    // ============================================================
    { code:'AF', iso3:'AFG', ar:'أفغانستان', en:'Afghanistan', flag:'🇦🇫', lat:33.9, lng:67.7, kw:['أفغانستان','كابول','Afghanistan','Kabul'] },
    { code:'AM', iso3:'ARM', ar:'أرمينيا', en:'Armenia', flag:'🇦🇲', lat:40.1, lng:45.0, kw:['أرمينيا','Armenia','Yerevan'] },
    { code:'AZ', iso3:'AZE', ar:'أذربيجان', en:'Azerbaijan', flag:'🇦🇿', lat:40.1, lng:47.6, kw:['أذربيجان','Azerbaijan','Baku'] },
    { code:'BH', iso3:'BHR', ar:'البحرين', en:'Bahrain', flag:'🇧🇭', lat:26.0, lng:50.5, kw:['البحرين','المنامة','Bahrain','Manama'] },
    { code:'BD', iso3:'BGD', ar:'بنغلاديش', en:'Bangladesh', flag:'🇧🇩', lat:23.7, lng:90.4, kw:['بنغلاديش','Bangladesh','Dhaka'] },
    { code:'BT', iso3:'BTN', ar:'بوتان', en:'Bhutan', flag:'🇧🇹', lat:27.5, lng:90.4, kw:['بوتان','Bhutan','Thimphu'] },
    { code:'BN', iso3:'BRN', ar:'بروناي', en:'Brunei', flag:'🇧🇳', lat:4.5, lng:114.7, kw:['بروناي','Brunei'] },
    { code:'KH', iso3:'KHM', ar:'كمبوديا', en:'Cambodia', flag:'🇰🇭', lat:12.5, lng:104.9, kw:['كمبوديا','Cambodia','Phnom Penh'] },
    { code:'CN', iso3:'CHN', ar:'الصين', en:'China', flag:'🇨🇳', lat:35.9, lng:104.2, kw:['الصين','بكين','China','Beijing','Chinese'] },
    { code:'CY', iso3:'CYP', ar:'قبرص', en:'Cyprus', flag:'🇨🇾', lat:35.1, lng:33.4, kw:['قبرص','Cyprus','Nicosia'] },
    { code:'GE', iso3:'GEO', ar:'جورجيا', en:'Georgia', flag:'🇬🇪', lat:42.3, lng:43.4, kw:['جورجيا','Georgia','Tbilisi'] },
    { code:'IN', iso3:'IND', ar:'الهند', en:'India', flag:'🇮🇳', lat:20.6, lng:79.0, kw:['الهند','نيودلهي','India','Delhi','Mumbai'] },
    { code:'ID', iso3:'IDN', ar:'إندونيسيا', en:'Indonesia', flag:'🇮🇩', lat:-0.8, lng:113.9, kw:['إندونيسيا','Indonesia','Jakarta'] },
    { code:'IR', iso3:'IRN', ar:'إيران', en:'Iran', flag:'🇮🇷', lat:32.4, lng:53.7, kw:['إيران','طهران','Iran','Tehran'] },
    { code:'IQ', iso3:'IRQ', ar:'العراق', en:'Iraq', flag:'🇮🇶', lat:33.2, lng:43.7, kw:['العراق','بغداد','Iraq','Baghdad'] },
    { code:'IL', iso3:'ISR', ar:'إسرائيل', en:'Israel', flag:'🇮🇱', lat:31.0, lng:34.8, kw:['إسرائيل','تل أبيب','Israel','Tel Aviv'] },
    { code:'JP', iso3:'JPN', ar:'اليابان', en:'Japan', flag:'🇯🇵', lat:36.2, lng:138.3, kw:['اليابان','طوكيو','Japan','Tokyo','Japanese'] },
    { code:'JO', iso3:'JOR', ar:'الأردن', en:'Jordan', flag:'🇯🇴', lat:30.6, lng:36.2, kw:['الأردن','عمّان','Jordan','Amman'] },
    { code:'KZ', iso3:'KAZ', ar:'كازاخستان', en:'Kazakhstan', flag:'🇰🇿', lat:48.0, lng:66.9, kw:['كازاخستان','Kazakhstan','Astana'] },
    { code:'KW', iso3:'KWT', ar:'الكويت', en:'Kuwait', flag:'🇰🇼', lat:29.3, lng:47.5, kw:['الكويت','Kuwait'] },
    { code:'KG', iso3:'KGZ', ar:'قيرغيزستان', en:'Kyrgyzstan', flag:'🇰🇬', lat:41.2, lng:74.8, kw:['قيرغيزستان','Kyrgyzstan','Bishkek'] },
    { code:'LA', iso3:'LAO', ar:'لاوس', en:'Laos', flag:'🇱🇦', lat:19.9, lng:102.5, kw:['لاوس','Laos','Vientiane'] },
    { code:'LB', iso3:'LBN', ar:'لبنان', en:'Lebanon', flag:'🇱🇧', lat:33.9, lng:35.9, kw:['لبنان','بيروت','Lebanon','Beirut'] },
    { code:'MY', iso3:'MYS', ar:'ماليزيا', en:'Malaysia', flag:'🇲🇾', lat:4.2, lng:101.9, kw:['ماليزيا','Malaysia','Kuala Lumpur'] },
    { code:'MV', iso3:'MDV', ar:'المالديف', en:'Maldives', flag:'🇲🇻', lat:3.2, lng:73.2, kw:['المالديف','Maldives','Male'] },
    { code:'MN', iso3:'MNG', ar:'منغوليا', en:'Mongolia', flag:'🇲🇳', lat:46.9, lng:103.8, kw:['منغوليا','Mongolia','Ulaanbaatar'] },
    { code:'MM', iso3:'MMR', ar:'ميانمار', en:'Myanmar', flag:'🇲🇲', lat:21.9, lng:95.9, kw:['ميانمار','Myanmar','Burma','Yangon'] },
    { code:'NP', iso3:'NPL', ar:'نيبال', en:'Nepal', flag:'🇳🇵', lat:28.4, lng:84.1, kw:['نيبال','Nepal','Kathmandu'] },
    { code:'KP', iso3:'PRK', ar:'كوريا الشمالية', en:'North Korea', flag:'🇰🇵', lat:40.3, lng:127.5, kw:['كوريا الشمالية','North Korea','Pyongyang'] },
    { code:'OM', iso3:'OMN', ar:'عُمان', en:'Oman', flag:'🇴🇲', lat:21.5, lng:55.9, kw:['عُمان','مسقط','Oman','Muscat'] },
    { code:'PK', iso3:'PAK', ar:'باكستان', en:'Pakistan', flag:'🇵🇰', lat:30.4, lng:69.3, kw:['باكستان','Pakistan','Islamabad','Karachi'] },
    { code:'PS', iso3:'PSE', ar:'فلسطين', en:'Palestine', flag:'🇵🇸', lat:31.9, lng:35.2, kw:['فلسطين','غزة','القدس','Palestine','Gaza','Jerusalem','West Bank'] },
    { code:'PH', iso3:'PHL', ar:'الفلبين', en:'Philippines', flag:'🇵🇭', lat:12.9, lng:121.8, kw:['الفلبين','Philippines','Manila'] },
    { code:'QA', iso3:'QAT', ar:'قطر', en:'Qatar', flag:'🇶🇦', lat:25.3, lng:51.2, kw:['قطر','الدوحة','Qatar','Doha'] },
    { code:'SA', iso3:'SAU', ar:'السعودية', en:'Saudi Arabia', flag:'🇸🇦', lat:23.9, lng:45.1, kw:['السعودية','الرياض','جدة','Saudi','Riyadh','Jeddah'] },
    { code:'SG', iso3:'SGP', ar:'سنغافورة', en:'Singapore', flag:'🇸🇬', lat:1.4, lng:103.8, kw:['سنغافورة','Singapore'] },
    { code:'KR', iso3:'KOR', ar:'كوريا الجنوبية', en:'South Korea', flag:'🇰🇷', lat:35.9, lng:127.8, kw:['كوريا الجنوبية','كوريا','South Korea','Seoul'] },
    { code:'LK', iso3:'LKA', ar:'سريلانكا', en:'Sri Lanka', flag:'🇱🇰', lat:7.9, lng:80.8, kw:['سريلانكا','Sri Lanka','Colombo'] },
    { code:'SY', iso3:'SYR', ar:'سوريا', en:'Syria', flag:'🇸🇾', lat:34.8, lng:38.9, kw:['سوريا','دمشق','Syria','Damascus'] },
    { code:'TJ', iso3:'TJK', ar:'طاجيكستان', en:'Tajikistan', flag:'🇹🇯', lat:38.9, lng:71.3, kw:['طاجيكستان','Tajikistan','Dushanbe'] },
    { code:'TH', iso3:'THA', ar:'تايلاند', en:'Thailand', flag:'🇹🇭', lat:15.9, lng:100.9, kw:['تايلاند','Thailand','Bangkok'] },
    { code:'TL', iso3:'TLS', ar:'تيمور الشرقية', en:'Timor-Leste', flag:'🇹🇱', lat:-8.9, lng:125.7, kw:['تيمور الشرقية','Timor-Leste'] },
    { code:'TR', iso3:'TUR', ar:'تركيا', en:'Turkey', flag:'🇹🇷', lat:38.9, lng:35.2, kw:['تركيا','أنقرة','إسطنبول','Turkey','Ankara','Istanbul'] },
    { code:'TM', iso3:'TKM', ar:'تركمانستان', en:'Turkmenistan', flag:'🇹🇲', lat:38.9, lng:59.6, kw:['تركمانستان','Turkmenistan','Ashgabat'] },
    { code:'AE', iso3:'ARE', ar:'الإمارات', en:'UAE', flag:'🇦🇪', lat:23.4, lng:53.8, kw:['الإمارات','دبي','أبوظبي','UAE','Dubai','Emirates'] },
    { code:'UZ', iso3:'UZB', ar:'أوزبكستان', en:'Uzbekistan', flag:'🇺🇿', lat:41.4, lng:64.6, kw:['أوزبكستان','Uzbekistan','Tashkent'] },
    { code:'VN', iso3:'VNM', ar:'فيتنام', en:'Vietnam', flag:'🇻🇳', lat:14.1, lng:108.3, kw:['فيتنام','Vietnam','Hanoi'] },
    { code:'YE', iso3:'YEM', ar:'اليمن', en:'Yemen', flag:'🇾🇪', lat:15.6, lng:48.5, kw:['اليمن','صنعاء','عدن','Yemen','Sanaa','Aden'] },

    // ============================================================
    //  🇪🇺 أوروبا (44 دولة)
    // ============================================================
    { code:'AL', iso3:'ALB', ar:'ألبانيا', en:'Albania', flag:'🇦🇱', lat:41.2, lng:20.2, kw:['ألبانيا','Albania','Tirana'] },
    { code:'AD', iso3:'AND', ar:'أندورا', en:'Andorra', flag:'🇦🇩', lat:42.5, lng:1.5, kw:['أندورا','Andorra'] },
    { code:'AT', iso3:'AUT', ar:'النمسا', en:'Austria', flag:'🇦🇹', lat:47.5, lng:14.6, kw:['النمسا','فيينا','Austria','Vienna'] },
    { code:'BY', iso3:'BLR', ar:'بيلاروسيا', en:'Belarus', flag:'🇧🇾', lat:53.7, lng:27.9, kw:['بيلاروسيا','مينسك','Belarus','Minsk'] },
    { code:'BE', iso3:'BEL', ar:'بلجيكا', en:'Belgium', flag:'🇧🇪', lat:50.5, lng:4.5, kw:['بلجيكا','بروكسل','Belgium','Brussels'] },
    { code:'BA', iso3:'BIH', ar:'البوسنة والهرسك', en:'Bosnia', flag:'🇧🇦', lat:43.9, lng:17.7, kw:['البوسنة','Bosnia','Sarajevo'] },
    { code:'BG', iso3:'BGR', ar:'بلغاريا', en:'Bulgaria', flag:'🇧🇬', lat:42.7, lng:25.5, kw:['بلغاريا','Bulgaria','Sofia'] },
    { code:'HR', iso3:'HRV', ar:'كرواتيا', en:'Croatia', flag:'🇭🇷', lat:45.1, lng:15.2, kw:['كرواتيا','Croatia','Zagreb'] },
    { code:'CZ', iso3:'CZE', ar:'التشيك', en:'Czechia', flag:'🇨🇿', lat:49.8, lng:15.5, kw:['التشيك','براغ','Czech','Prague'] },
    { code:'DK', iso3:'DNK', ar:'الدنمارك', en:'Denmark', flag:'🇩🇰', lat:56.3, lng:9.5, kw:['الدنمارك','كوبنهاغن','Denmark','Copenhagen'] },
    { code:'EE', iso3:'EST', ar:'إستونيا', en:'Estonia', flag:'🇪🇪', lat:58.6, lng:25.0, kw:['إستونيا','Estonia','Tallinn'] },
    { code:'FI', iso3:'FIN', ar:'فنلندا', en:'Finland', flag:'🇫🇮', lat:61.9, lng:25.7, kw:['فنلندا','Finland','Helsinki'] },
    { code:'FR', iso3:'FRA', ar:'فرنسا', en:'France', flag:'🇫🇷', lat:46.2, lng:2.2, kw:['فرنسا','باريس','France','Paris'] },
    { code:'DE', iso3:'DEU', ar:'ألمانيا', en:'Germany', flag:'🇩🇪', lat:51.2, lng:10.5, kw:['ألمانيا','برلين','Germany','Berlin'] },
    { code:'GR', iso3:'GRC', ar:'اليونان', en:'Greece', flag:'🇬🇷', lat:39.1, lng:21.8, kw:['اليونان','أثينا','Greece','Athens'] },
    { code:'HU', iso3:'HUN', ar:'هنغاريا', en:'Hungary', flag:'🇭🇺', lat:47.2, lng:19.5, kw:['هنغاريا','المجر','Hungary','Budapest'] },
    { code:'IS', iso3:'ISL', ar:'آيسلندا', en:'Iceland', flag:'🇮🇸', lat:65.0, lng:-18.6, kw:['آيسلندا','Iceland','Reykjavik'] },
    { code:'IE', iso3:'IRL', ar:'إيرلندا', en:'Ireland', flag:'🇮🇪', lat:53.4, lng:-8.2, kw:['إيرلندا','Ireland','Dublin'] },
    { code:'IT', iso3:'ITA', ar:'إيطاليا', en:'Italy', flag:'🇮🇹', lat:41.9, lng:12.6, kw:['إيطاليا','روما','Italy','Rome'] },
    { code:'LV', iso3:'LVA', ar:'لاتفيا', en:'Latvia', flag:'🇱🇻', lat:56.9, lng:24.6, kw:['لاتفيا','Latvia','Riga'] },
    { code:'LI', iso3:'LIE', ar:'ليختنشتاين', en:'Liechtenstein', flag:'🇱🇮', lat:47.2, lng:9.6, kw:['ليختنشتاين','Liechtenstein'] },
    { code:'LT', iso3:'LTU', ar:'ليتوانيا', en:'Lithuania', flag:'🇱🇹', lat:55.2, lng:23.9, kw:['ليتوانيا','Lithuania','Vilnius'] },
    { code:'LU', iso3:'LUX', ar:'لوكسمبورغ', en:'Luxembourg', flag:'🇱🇺', lat:49.8, lng:6.1, kw:['لوكسمبورغ','Luxembourg'] },
    { code:'MT', iso3:'MLT', ar:'مالطا', en:'Malta', flag:'🇲🇹', lat:35.9, lng:14.4, kw:['مالطا','Malta','Valletta'] },
    { code:'MD', iso3:'MDA', ar:'مولدوفا', en:'Moldova', flag:'🇲🇩', lat:47.4, lng:28.4, kw:['مولدوفا','Moldova','Chisinau'] },
    { code:'MC', iso3:'MCO', ar:'موناكو', en:'Monaco', flag:'🇲🇨', lat:43.7, lng:7.4, kw:['موناكو','Monaco'] },
    { code:'ME', iso3:'MNE', ar:'الجبل الأسود', en:'Montenegro', flag:'🇲🇪', lat:42.7, lng:19.4, kw:['الجبل الأسود','Montenegro','Podgorica'] },
    { code:'NL', iso3:'NLD', ar:'هولندا', en:'Netherlands', flag:'🇳🇱', lat:52.1, lng:5.3, kw:['هولندا','أمستردام','Netherlands','Holland','Amsterdam'] },
    { code:'MK', iso3:'MKD', ar:'مقدونيا الشمالية', en:'North Macedonia', flag:'🇲🇰', lat:41.6, lng:21.7, kw:['مقدونيا','North Macedonia','Skopje'] },
    { code:'NO', iso3:'NOR', ar:'النرويج', en:'Norway', flag:'🇳🇴', lat:60.5, lng:8.5, kw:['النرويج','أوسلو','Norway','Oslo'] },
    { code:'PL', iso3:'POL', ar:'بولندا', en:'Poland', flag:'🇵🇱', lat:51.9, lng:19.1, kw:['بولندا','وارسو','Poland','Warsaw'] },
    { code:'PT', iso3:'PRT', ar:'البرتغال', en:'Portugal', flag:'🇵🇹', lat:39.4, lng:-8.2, kw:['البرتغال','لشبونة','Portugal','Lisbon'] },
    { code:'RO', iso3:'ROU', ar:'رومانيا', en:'Romania', flag:'🇷🇴', lat:45.9, lng:24.9, kw:['رومانيا','Romania','Bucharest'] },
    { code:'RU', iso3:'RUS', ar:'روسيا', en:'Russia', flag:'🇷🇺', lat:61.5, lng:105.3, kw:['روسيا','موسكو','Russia','Moscow','Russian'] },
    { code:'SM', iso3:'SMR', ar:'سان مارينو', en:'San Marino', flag:'🇸🇲', lat:43.9, lng:12.5, kw:['سان مارينو','San Marino'] },
    { code:'RS', iso3:'SRB', ar:'صربيا', en:'Serbia', flag:'🇷🇸', lat:44.0, lng:21.0, kw:['صربيا','بلغراد','Serbia','Belgrade'] },
    { code:'SK', iso3:'SVK', ar:'سلوفاكيا', en:'Slovakia', flag:'🇸🇰', lat:48.7, lng:19.7, kw:['سلوفاكيا','Slovakia','Bratislava'] },
    { code:'SI', iso3:'SVN', ar:'سلوفينيا', en:'Slovenia', flag:'🇸🇮', lat:46.2, lng:15.0, kw:['سلوفينيا','Slovenia','Ljubljana'] },
    { code:'ES', iso3:'ESP', ar:'إسبانيا', en:'Spain', flag:'🇪🇸', lat:40.5, lng:-3.7, kw:['إسبانيا','مدريد','Spain','Madrid'] },
    { code:'SE', iso3:'SWE', ar:'السويد', en:'Sweden', flag:'🇸🇪', lat:60.1, lng:18.6, kw:['السويد','ستوكهولم','Sweden','Stockholm'] },
    { code:'CH', iso3:'CHE', ar:'سويسرا', en:'Switzerland', flag:'🇨🇭', lat:46.8, lng:8.2, kw:['سويسرا','Switzerland','Zurich','Geneva'] },
    { code:'UA', iso3:'UKR', ar:'أوكرانيا', en:'Ukraine', flag:'🇺🇦', lat:48.4, lng:31.2, kw:['أوكرانيا','كييف','Ukraine','Kyiv','Kiev'] },
    { code:'GB', iso3:'GBR', ar:'بريطانيا', en:'United Kingdom', flag:'🇬🇧', lat:55.4, lng:-3.4, kw:['بريطانيا','لندن','United Kingdom','UK','Britain','London','England','Scotland','Wales'] },
    { code:'VA', iso3:'VAT', ar:'الفاتيكان', en:'Vatican City', flag:'🇻🇦', lat:41.9, lng:12.5, kw:['الفاتيكان','Vatican','Pope'] },

    // ============================================================
    //  🌎 أمريكا الشمالية والكاريبي (23 دولة)
    // ============================================================
    { code:'AG', iso3:'ATG', ar:'أنتيغوا وبربودا', en:'Antigua and Barbuda', flag:'🇦🇬', lat:17.1, lng:-61.8, kw:['أنتيغوا','Antigua'] },
    { code:'BS', iso3:'BHS', ar:'الباهاما', en:'Bahamas', flag:'🇧🇸', lat:25.0, lng:-77.4, kw:['الباهاما','Bahamas','Nassau'] },
    { code:'BB', iso3:'BRB', ar:'بربادوس', en:'Barbados', flag:'🇧🇧', lat:13.2, lng:-59.5, kw:['بربادوس','Barbados'] },
    { code:'BZ', iso3:'BLZ', ar:'بليز', en:'Belize', flag:'🇧🇿', lat:17.2, lng:-88.5, kw:['بليز','Belize'] },
    { code:'CA', iso3:'CAN', ar:'كندا', en:'Canada', flag:'🇨🇦', lat:56.1, lng:-106.3, kw:['كندا','أوتاوا','كيبيك','Canada','Ottawa','Toronto','Quebec'] },
    { code:'CR', iso3:'CRI', ar:'كوستاريكا', en:'Costa Rica', flag:'🇨🇷', lat:9.7, lng:-83.8, kw:['كوستاريكا','Costa Rica'] },
    { code:'CU', iso3:'CUB', ar:'كوبا', en:'Cuba', flag:'🇨🇺', lat:21.5, lng:-77.8, kw:['كوبا','Cuba','Havana'] },
    { code:'DM', iso3:'DMA', ar:'دومينيكا', en:'Dominica', flag:'🇩🇲', lat:15.4, lng:-61.4, kw:['دومينيكا','Dominica'] },
    { code:'DO', iso3:'DOM', ar:'الدومينيكان', en:'Dominican Republic', flag:'🇩🇴', lat:18.7, lng:-70.2, kw:['الدومينيكان','Dominican'] },
    { code:'SV', iso3:'SLV', ar:'السلفادور', en:'El Salvador', flag:'🇸🇻', lat:13.8, lng:-88.9, kw:['السلفادور','El Salvador'] },
    { code:'GD', iso3:'GRD', ar:'غرينادا', en:'Grenada', flag:'🇬🇩', lat:12.1, lng:-61.7, kw:['غرينادا','Grenada'] },
    { code:'GT', iso3:'GTM', ar:'غواتيمالا', en:'Guatemala', flag:'🇬🇹', lat:15.8, lng:-90.2, kw:['غواتيمالا','Guatemala'] },
    { code:'HT', iso3:'HTI', ar:'هايتي', en:'Haiti', flag:'🇭🇹', lat:18.9, lng:-72.3, kw:['هايتي','Haiti','Port-au-Prince'] },
    { code:'HN', iso3:'HND', ar:'هندوراس', en:'Honduras', flag:'🇭🇳', lat:15.2, lng:-86.2, kw:['هندوراس','Honduras'] },
    { code:'JM', iso3:'JAM', ar:'جامايكا', en:'Jamaica', flag:'🇯🇲', lat:18.1, lng:-77.3, kw:['جامايكا','Jamaica','Kingston'] },
    { code:'MX', iso3:'MEX', ar:'المكسيك', en:'Mexico', flag:'🇲🇽', lat:23.6, lng:-102.6, kw:['المكسيك','Mexico','Mexico City'] },
    { code:'NI', iso3:'NIC', ar:'نيكاراغوا', en:'Nicaragua', flag:'🇳🇮', lat:12.9, lng:-85.2, kw:['نيكاراغوا','Nicaragua'] },
    { code:'PA', iso3:'PAN', ar:'بنما', en:'Panama', flag:'🇵🇦', lat:8.5, lng:-80.8, kw:['بنما','Panama'] },
    { code:'KN', iso3:'KNA', ar:'سانت كيتس', en:'Saint Kitts and Nevis', flag:'🇰🇳', lat:17.4, lng:-62.8, kw:['سانت كيتس','Saint Kitts'] },
    { code:'LC', iso3:'LCA', ar:'سانت لوسيا', en:'Saint Lucia', flag:'🇱🇨', lat:13.9, lng:-61.0, kw:['سانت لوسيا','Saint Lucia'] },
    { code:'VC', iso3:'VCT', ar:'سانت فينسنت', en:'Saint Vincent', flag:'🇻🇨', lat:12.9, lng:-61.2, kw:['سانت فينسنت','Saint Vincent'] },
    { code:'TT', iso3:'TTO', ar:'ترينيداد وتوباغو', en:'Trinidad and Tobago', flag:'🇹🇹', lat:10.7, lng:-61.2, kw:['ترينيداد','Trinidad'] },
    { code:'US', iso3:'USA', ar:'الولايات المتحدة', en:'United States', flag:'🇺🇸', lat:39.8, lng:-98.6, kw:['الولايات المتحدة','أمريكا','واشنطن','نيويورك','United States','USA','Washington','New York','America','California','Texas'] },

    // ============================================================
    //  🌎 أمريكا الجنوبية (12 دولة)
    // ============================================================
    { code:'AR', iso3:'ARG', ar:'الأرجنتين', en:'Argentina', flag:'🇦🇷', lat:-38.4, lng:-63.6, kw:['الأرجنتين','Argentina','Buenos Aires'] },
    { code:'BO', iso3:'BOL', ar:'بوليفيا', en:'Bolivia', flag:'🇧🇴', lat:-16.3, lng:-63.6, kw:['بوليفيا','Bolivia','La Paz'] },
    { code:'BR', iso3:'BRA', ar:'البرازيل', en:'Brazil', flag:'🇧🇷', lat:-14.2, lng:-51.9, kw:['البرازيل','Brazil','Brasilia','Sao Paulo','Rio'] },
    { code:'CL', iso3:'CHL', ar:'تشيلي', en:'Chile', flag:'🇨🇱', lat:-35.7, lng:-71.5, kw:['تشيلي','Chile','Santiago'] },
    { code:'CO', iso3:'COL', ar:'كولومبيا', en:'Colombia', flag:'🇨🇴', lat:4.6, lng:-74.3, kw:['كولومبيا','Colombia','Bogota'] },
    { code:'EC', iso3:'ECU', ar:'الإكوادور', en:'Ecuador', flag:'🇪🇨', lat:-1.8, lng:-78.2, kw:['الإكوادور','Ecuador','Quito'] },
    { code:'GY', iso3:'GUY', ar:'غيانا', en:'Guyana', flag:'🇬🇾', lat:4.9, lng:-58.9, kw:['غيانا','Guyana'] },
    { code:'PY', iso3:'PRY', ar:'باراغواي', en:'Paraguay', flag:'🇵🇾', lat:-23.4, lng:-58.4, kw:['باراغواي','Paraguay'] },
    { code:'PE', iso3:'PER', ar:'بيرو', en:'Peru', flag:'🇵🇪', lat:-9.2, lng:-75.0, kw:['بيرو','Peru','Lima'] },
    { code:'SR', iso3:'SUR', ar:'سورينام', en:'Suriname', flag:'🇸🇷', lat:3.9, lng:-56.0, kw:['سورينام','Suriname'] },
    { code:'UY', iso3:'URY', ar:'أوروغواي', en:'Uruguay', flag:'🇺🇾', lat:-32.5, lng:-55.8, kw:['أوروغواي','Uruguay','Montevideo'] },
    { code:'VE', iso3:'VEN', ar:'فنزويلا', en:'Venezuela', flag:'🇻🇪', lat:6.4, lng:-66.6, kw:['فنزويلا','Venezuela','Caracas'] },

    // ============================================================
    //  🇦🇺 أوقيانوسيا (14 دولة)
    // ============================================================
    { code:'AU', iso3:'AUS', ar:'أستراليا', en:'Australia', flag:'🇦🇺', lat:-25.3, lng:133.8, kw:['أستراليا','سيدني','Australia','Sydney','Melbourne','Canberra'] },
    { code:'FJ', iso3:'FJI', ar:'فيجي', en:'Fiji', flag:'🇫🇯', lat:-17.7, lng:178.1, kw:['فيجي','Fiji'] },
    { code:'KI', iso3:'KIR', ar:'كيريباتي', en:'Kiribati', flag:'🇰🇮', lat:-3.4, lng:-168.7, kw:['كيريباتي','Kiribati'] },
    { code:'MH', iso3:'MHL', ar:'جزر مارشال', en:'Marshall Islands', flag:'🇲🇭', lat:7.1, lng:171.2, kw:['جزر مارشال','Marshall'] },
    { code:'FM', iso3:'FSM', ar:'ميكرونيزيا', en:'Micronesia', flag:'🇫🇲', lat:7.4, lng:150.6, kw:['ميكرونيزيا','Micronesia'] },
    { code:'NR', iso3:'NRU', ar:'ناورو', en:'Nauru', flag:'🇳🇷', lat:-0.5, lng:166.9, kw:['ناورو','Nauru'] },
    { code:'NZ', iso3:'NZL', ar:'نيوزيلندا', en:'New Zealand', flag:'🇳🇿', lat:-40.9, lng:174.9, kw:['نيوزيلندا','New Zealand','Auckland','Wellington'] },
    { code:'PW', iso3:'PLW', ar:'بالاو', en:'Palau', flag:'🇵🇼', lat:7.5, lng:134.6, kw:['بالاو','Palau'] },
    { code:'PG', iso3:'PNG', ar:'بابوا غينيا الجديدة', en:'Papua New Guinea', flag:'🇵🇬', lat:-6.3, lng:143.9, kw:['بابوا','Papua New Guinea'] },
    { code:'WS', iso3:'WSM', ar:'ساموا', en:'Samoa', flag:'🇼🇸', lat:-13.8, lng:-172.1, kw:['ساموا','Samoa'] },
    { code:'SB', iso3:'SLB', ar:'جزر سليمان', en:'Solomon Islands', flag:'🇸🇧', lat:-9.6, lng:160.2, kw:['جزر سليمان','Solomon'] },
    { code:'TO', iso3:'TON', ar:'تونغا', en:'Tonga', flag:'🇹🇴', lat:-21.2, lng:-175.2, kw:['تونغا','Tonga'] },
    { code:'TV', iso3:'TUV', ar:'توفالو', en:'Tuvalu', flag:'🇹🇻', lat:-7.1, lng:177.6, kw:['توفالو','Tuvalu'] },
    { code:'VU', iso3:'VUT', ar:'فانواتو', en:'Vanuatu', flag:'🇻🇺', lat:-15.4, lng:166.9, kw:['فانواتو','Vanuatu'] }
];

// ============================================================
//  🗺️ خريطة ISO3 → ISO2
// ============================================================
const ISO3_TO_ISO2 = {};
ALL_COUNTRIES.forEach(c => {
    ISO3_TO_ISO2[c.iso3] = c.code;
});

// ============================================================
//  🔍 دوال مساعدة
// ============================================================
function getCountryByCode(code) {
    return ALL_COUNTRIES.find(c => c.code === code);
}

function detectCountry(title) {
    if (!title) return null;
    const lower = title.toLowerCase();
    // نفضل الكلمات الأطول أولاً (لتجنب الأخطاء)
    const sortedCountries = [...ALL_COUNTRIES].sort((a, b) => {
        const aMax = Math.max(...a.kw.map(k => k.length));
        const bMax = Math.max(...b.kw.map(k => k.length));
        return bMax - aMax;
    });

    for (const c of sortedCountries) {
        for (const kw of c.kw) {
            if (kw.length < 3) continue; // تجاهل الكلمات القصيرة جداً
            if (lower.includes(kw.toLowerCase())) {
                return c.code;
            }
        }
    }
    return null;
}

function getCountryInfo(code) {
    const c = getCountryByCode(code);
    if (!c) return null;
    return {
        flag: c.flag,
        name: c.ar,
        nameEn: c.en,
        lat: c.lat,
        lng: c.lng
    };
}

// ============================================================
//  🌐 التصدير
// ============================================================
window.ALL_COUNTRIES = ALL_COUNTRIES;
window.ISO3_TO_ISO2 = ISO3_TO_ISO2;
window.getCountryByCode = getCountryByCode;
window.getCountryInfo = getCountryInfo;
window.detectCountryFromTitle = detectCountry;

console.log(`✅ تم تحميل ${ALL_COUNTRIES.length} دولة من كل العالم`);