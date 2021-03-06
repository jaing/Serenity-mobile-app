({
    baseUrl: '.',
    dir: 'build',
    name: 'main',
    fileExclusionRegExp: /^css/,
    paths: {
        jquery: 'libs/jquery-2.1.1',
        underscore: 'libs/underscore',
        backbone: 'libs/backbone',
        iscroll: 'libs/iscroll',
        text: 'libs/text'
    },
    shim: {
        'backbone': {
            'deps': ['underscore', 'jquery','iscroll','text']
        }
    }
})
