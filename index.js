const fs = require('fs');

const ngxWallabyJest = function (file, done) {
    var template = file.content;
    const stylesUrl = template.indexOf('styleUrls');
    if (stylesUrl > -1) {
        const endTemplateUrl = template.indexOf(']', stylesUrl) + 2;
        template = template.substring(0, stylesUrl) + template.substring(endTemplateUrl);
    }

    const containsTemplateUrl = template.indexOf('templateUrl');

    if (containsTemplateUrl > -1) {
        const path = file.path.substring(0, file.path.indexOf('.ts')) + '.html';
        fs.readFile(path, 'utf8', function (err, data) {
            console.log(data)
            if (err) {
                return console.error('Component template not found for: ', file.path, path);
            }
            const beginTemplate = template.indexOf(':', containsTemplateUrl) + 1;
            const endTemplate = template.indexOf('.html', beginTemplate) + 6;
            template = template.substring(0, beginTemplate) + '`' + data + '`' + template.substring(endTemplate);
            done(template.replace('templateUrl', 'template'));
        });
    } else {
        done(template);
    }
};

module.exports = ngxWallabyJest;