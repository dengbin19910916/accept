(function( $ ){
    // 当domReady的时候开始初始化
    $(function() {
        $(window).load(function(){
            var $wrap_0 = $('#uploader_0'),

                // 图片容器
                $queue_0 = $( '<ul class="filelist"></ul>' )
                    .appendTo( $wrap_0.find( '.queueList' ) ),

                // 状态栏，包括进度和控制按钮
                $statusBar_0 = $wrap_0.find( '.statusBar' ),

                // 文件总体选择信息。
                $info_0 = $statusBar_0.find( '.info' ),

                // 上传按钮
                $upload_0 = $wrap_0.find( '.uploadBtn' ),

                // 没选择文件之前的内容。
                $placeHolder_0 = $wrap_0.find( '.placeholder' ),

                $progress_0 = $statusBar_0.find( '.progress' ).hide(),

                // 添加的文件数量
                fileCount_0 = 0,

                // 添加的文件总大小
                fileSize_0 = 0,

                // 优化retina, 在retina下这个值是2
                ratio_0 = window.devicePixelRatio || 1,

                // 缩略图大小
                thumbnailWidth_0 = 110 * ratio_0,
                thumbnailHeight_0 = 110 * ratio_0,

                // 可能有pedding, ready, uploading, confirm, done.
                state_0 = 'pedding',

                // 所有文件的进度信息，key为file id
                percentages_0 = {},
                // 判断浏览器是否支持图片的base64
                isSupportBase64_0 = ( function() {
                    var data = new Image();
                    var support = true;
                    data.onload = data.onerror = function() {
                        if( this.width != 1 || this.height != 1 ) {
                            support = false;
                        }
                    }
                    data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                    return support;
                } )(),

                // 检测是否已经安装flash，检测flash的版本
                flashVersion_0 = ( function() {
                    var version;

                    try {
                        version = navigator.plugins[ 'Shockwave Flash' ];
                        version = version.description;
                    } catch ( ex ) {
                        try {
                            version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                                    .GetVariable('$version');
                        } catch ( ex2 ) {
                            version = '0.0';
                        }
                    }
                    version = version.match( /\d+/g );
                    return parseFloat( version[ 0 ] + '.' + version[ 1 ], 10 );
                } )(),

                supportTransition_0 = (function(){
                    var s = document.createElement('p').style,
                        r = 'transition' in s ||
                                'WebkitTransition' in s ||
                                'MozTransition' in s ||
                                'msTransition' in s ||
                                'OTransition' in s;
                    s = null;
                    return r;
                })(),

                // WebUploader实例
                uploader_0;

            if ( !WebUploader.Uploader.support('flash') && WebUploader.browser.ie ) {

                // flash 安装了但是版本过低。
                if (flashVersion_0) {
                    (function(container) {
                        window['expressinstallcallback'] = function( state_0 ) {
                            switch(state_0) {
                                case 'Download.Cancelled':
                                    alert('您取消了更新！')
                                    break;

                                case 'Download.Failed':
                                    alert('安装失败')
                                    break;

                                default:
                                    alert('安装已成功，请刷新！');
                                    break;
                            }
                            delete window['expressinstallcallback'];
                        };

                        var swf = './expressInstall.swf';
                        // insert flash object
                        var html = '<object type="application/' +
                                'x-shockwave-flash" data="' +  swf + '" ';

                        if (WebUploader.browser.ie) {
                            html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
                        }

                        html += 'width="100%" height="100%" style="outline:0">'  +
                            '<param name="movie" value="' + swf + '" />' +
                            '<param name="wmode" value="transparent" />' +
                            '<param name="allowscriptaccess" value="always" />' +
                        '</object>';

                        container.html(html);

                    })($wrap_0);

                // 压根就没有安转。
                } else {
                    $wrap_0.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
                }

                return;
            } else if (!WebUploader.Uploader.support()) {
                alert( 'Web Uploader 不支持您的浏览器！');
                return;
            }

            // 实例化
            uploader_0 = WebUploader.create({
                pick: {
                    id: '#filePicker_0',
                    label: '点击或拖拽上传资料文件'
                },
                formData: {
                    uid: 123
                },
                dnd: '#dndArea_0',
                paste: '#uploader_0',
                swf: 'Uploader.swf',
                chunked: false,
                chunkSize: 512 * 1024,
                server: 'fileupload.php',
                // runtimeOrder: 'flash',

                // accept: {
                //     title: 'Images',
                //     extensions: 'gif,jpg,jpeg,bmp,png',
                //     mimeTypes: 'image/*'
                // },

                // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
                disableGlobalDnd: true,
                fileNumLimit: 300,
                fileSize_0Limit: 200 * 1024 * 1024,    // 200 M
                fileSingleSizeLimit: 50 * 1024 * 1024    // 50 M
            });

            // 拖拽时不接受 js, txt 文件。
            uploader_0.on( 'dndAccept', function( items ) {
                var denied = false,
                    len = items.length,
                    i = 0,
                    // 修改js类型
                    unAllowed = 'text/plain;application/javascript ';

                for ( ; i < len; i++ ) {
                    // 如果在列表里面
                    if ( ~unAllowed.indexOf( items[ i ].type ) ) {
                        denied = true;
                        break;
                    }
                }

                return !denied;
            });

            // uploader_0.on('filesQueued', function() {
            //     uploader_0.sort(function( a, b ) {
            //         if ( a.name < b.name )
            //           return -1;
            //         if ( a.name > b.name )
            //           return 1;
            //         return 0;
            //     });
            // });

            // 添加“添加文件”的按钮，
            uploader_0.addButton({
                id: '#filePicker2_0',
                label: '继续添加'
            });

            uploader_0.on('ready', function() {
                window.uploader_0 = uploader_0;
            });

            // 当有文件添加进来时执行，负责view的创建
            function addFile( file ) {
                var $li = $( '<li id="' + file.id + '">' +
                        '<p class="title">' + file.name + '</p>' +
                        '<p class="imgWrap"></p>'+
                        '<p class="progress"><span></span></p>' +
                        '</li>' ),

                    $btns = $('<div class="file-panel">' +
                        '<span class="cancel">删除</span>' +
                        '<span class="rotateRight">向右旋转</span>' +
                        '<span class="rotateLeft">向左旋转</span></div>').appendTo( $li ),
                    $prgress = $li.find('p.progress span'),
                    $wrap_0 = $li.find( 'p.imgWrap' ),
                    $info_0 = $('<p class="error"></p>'),

                    showError = function( code ) {
                        switch( code ) {
                            case 'exceed_size':
                                text = '文件大小超出';
                                break;

                            case 'interrupt':
                                text = '上传暂停';
                                break;

                            default:
                                text = '上传失败，请重试';
                                break;
                        }

                        $info_0.text( text ).appendTo( $li );
                    };

                if ( file.getStatus() === 'invalid' ) {
                    showError( file.statusText );
                } else {
                    // @todo lazyload
                    $wrap_0.text( '预览中' );
                    uploader_0.makeThumb( file, function( error, src ) {
                        var img;

                        if ( error ) {
                            $wrap_0.text( '不能预览' );
                            return;
                        }

                        if( isSupportBase64_0 ) {
                            img = $('<img src="'+src+'">');
                            $wrap_0.empty().append( img );
                        } else {
                            $.ajax('preview.php', {
                                method: 'POST',
                                data: src,
                                dataType:'json'
                            }).done(function( response ) {
                                if (response.result) {
                                    img = $('<img src="'+response.result+'">');
                                    $wrap_0.empty().append( img );
                                } else {
                                    $wrap_0.text("预览出错");
                                }
                            });
                        }
                    }, thumbnailWidth_0, thumbnailHeight_0 );

                    percentages_0[ file.id ] = [ file.size, 0 ];
                    file.rotation = 0;
                }

                file.on('statuschange', function( cur, prev ) {
                    if ( prev === 'progress' ) {
                        $prgress.hide().width(0);
                    } else if ( prev === 'queued' ) {
                        $li.off( 'mouseenter mouseleave' );
                        $btns.remove();
                    }

                    // 成功
                    if ( cur === 'error' || cur === 'invalid' ) {
                        console.log( file.statusText );
                        showError( file.statusText );
                        percentages_0[ file.id ][ 1 ] = 1;
                    } else if ( cur === 'interrupt' ) {
                        showError( 'interrupt' );
                    } else if ( cur === 'queued' ) {
                        percentages_0[ file.id ][ 1 ] = 0;
                    } else if ( cur === 'progress' ) {
                        $info_0.remove();
                        $prgress.css('display', 'block');
                    } else if ( cur === 'complete' ) {
                        $li.append( '<span class="success"></span>' );
                    }

                    $li.removeClass( 'state_0-' + prev ).addClass( 'state_0-' + cur );
                });

                $li.on( 'mouseenter', function() {
                    $btns.stop().animate({height: 30});
                });

                $li.on( 'mouseleave', function() {
                    $btns.stop().animate({height: 0});
                });

                $btns.on( 'click', 'span', function() {
                    var index = $(this).index(),
                        deg;

                    switch ( index ) {
                        case 0:
                            uploader_0.removeFile( file );
                            return;

                        case 1:
                            file.rotation += 90;
                            break;

                        case 2:
                            file.rotation -= 90;
                            break;
                    }

                    if ( supportTransition_0 ) {
                        deg = 'rotate(' + file.rotation + 'deg)';
                        $wrap_0.css({
                            '-webkit-transform': deg,
                            '-mos-transform': deg,
                            '-o-transform': deg,
                            'transform': deg
                        });
                    } else {
                        $wrap_0.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
                        // use jquery animate to rotation
                        // $({
                        //     rotation: rotation
                        // }).animate({
                        //     rotation: file.rotation
                        // }, {
                        //     easing: 'linear',
                        //     step: function( now ) {
                        //         now = now * Math.PI / 180;

                        //         var cos = Math.cos( now ),
                        //             sin = Math.sin( now );

                        //         $wrap_0.css( 'filter', "progid:DXImageTransform.Microsoft.Matrix(M11=" + cos + ",M12=" + (-sin) + ",M21=" + sin + ",M22=" + cos + ",SizingMethod='auto expand')");
                        //     }
                        // });
                    }


                });

                $li.appendTo( $queue_0 );
            }

            // 负责view的销毁
            function removeFile( file ) {
                var $li = $('#'+file.id);

                delete percentages_0[ file.id ];
                updateTotalProgress();
                $li.off().find('.file-panel').off().end().remove();
            }

            function updateTotalProgress() {
                var loaded = 0,
                    total = 0,
                    spans = $progress_0.children(),
                    percent;

                $.each( percentages_0, function( k, v ) {
                    total += v[ 0 ];
                    loaded += v[ 0 ] * v[ 1 ];
                } );

                percent = total ? loaded / total : 0;


                spans.eq( 0 ).text( Math.round( percent * 100 ) + '%' );
                spans.eq( 1 ).css( 'width', Math.round( percent * 100 ) + '%' );
                updateStatus();
            }

            function updateStatus() {
                var text = '', stats;

                if ( state_0 === 'ready' ) {
                    text = '选中' + fileCount_0 + '张图片，共' +
                            WebUploader.formatSize( fileSize_0 ) + '。';
                } else if ( state_0 === 'confirm' ) {
                    stats = uploader_0.getStats();
                    if ( stats.uploadFailNum ) {
                        text = '已成功上传' + stats.successNum+ '张照片至XX相册，'+
                            stats.uploadFailNum + '张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
                    }

                } else {
                    stats = uploader_0.getStats();
                    text = '共' + fileCount_0 + '张（' +
                            WebUploader.formatSize( fileSize_0 )  +
                            '），已上传' + stats.successNum + '张';

                    if ( stats.uploadFailNum ) {
                        text += '，失败' + stats.uploadFailNum + '张';
                    }
                }

                $info_0.html( text );
            }

            function setState( val ) {
                var file, stats;

                if ( val === state_0 ) {
                    return;
                }

                $upload_0.removeClass( 'state_0-' + state_0 );
                $upload_0.addClass( 'state_0-' + val );
                state_0 = val;

                switch ( state_0 ) {
                    case 'pedding':
                        $placeHolder_0.removeClass( 'element-invisible' );
                        $queue_0.hide();
                        $statusBar_0.addClass( 'element-invisible' );
                        uploader_0.refresh();
                        break;

                    case 'ready':
                        $placeHolder_0.addClass( 'element-invisible' );
                        $( '#filePicker2_0' ).removeClass( 'element-invisible');
                        $queue_0.show();
                        $statusBar_0.removeClass('element-invisible');
                        uploader_0.refresh();
                        break;

                    case 'uploading':
                        $( '#filePicker2_0' ).addClass( 'element-invisible' );
                        $progress_0.show();
                        $upload_0.text( '暂停上传' );
                        break;

                    case 'paused':
                        $progress_0.show();
                        $upload_0.text( '继续上传' );
                        break;

                    case 'confirm':
                        $progress_0.hide();
                        $( '#filePicker2_0' ).removeClass( 'element-invisible' );
                        $upload_0.text( '开始上传' );

                        stats = uploader_0.getStats();
                        if ( stats.successNum && !stats.uploadFailNum ) {
                            setState( 'finish' );
                            return;
                        }
                        break;
                    case 'finish':
                        stats = uploader_0.getStats();
                        if ( stats.successNum ) {
                            alert( '上传成功' );
                        } else {
                            // 没有成功的图片，重设
                            state_0 = 'done';
                            location.reload();
                        }
                        break;
                }

                updateStatus();
            }

            uploader_0.onUploadProgress = function( file, percentage ) {
                var $li = $('#'+file.id),
                    $percent = $li.find('.progress span');

                $percent.css( 'width', percentage * 100 + '%' );
                percentages_0[ file.id ][ 1 ] = percentage;
                updateTotalProgress();
            };

            uploader_0.onFileQueued = function( file ) {
                fileCount_0++;
                fileSize_0 += file.size;

                if ( fileCount_0 === 1 ) {
                    $placeHolder_0.addClass( 'element-invisible' );
                    $statusBar_0.show();
                }

                addFile( file );
                setState( 'ready' );
                updateTotalProgress();
            };

            uploader_0.onFileDequeued = function( file ) {
                fileCount_0--;
                fileSize_0 -= file.size;

                if ( !fileCount_0 ) {
                    setState( 'pedding' );
                }

                removeFile( file );
                updateTotalProgress();

            };

            uploader_0.on( 'all', function( type ) {
                var stats;
                switch( type ) {
                    case 'uploadFinished':
                        setState( 'confirm' );
                        break;

                    case 'startUpload':
                        setState( 'uploading' );
                        break;

                    case 'stopUpload':
                        setState( 'paused' );
                        break;

                }
            });

            uploader_0.onError = function( code ) {
                alert( 'Eroor: ' + code );
            };

            $upload_0.on('click', function() {
                if ( $(this).hasClass( 'disabled' ) ) {
                    return false;
                }

                if ( state_0 === 'ready' ) {
                    uploader_0.upload();
                } else if ( state_0 === 'paused' ) {
                    uploader_0.upload();
                } else if ( state_0 === 'uploading' ) {
                    uploader_0.stop();
                }
            });

            $info_0.on( 'click', '.retry', function() {
                uploader_0.retry();
            } );

            $info_0.on( 'click', '.ignore', function() {
                alert( 'todo' );
            } );

            $upload_0.addClass( 'state_0-' + state_0 );
            updateTotalProgress();
        });
    });
})( jQuery );