(function( $ ){
    // 当domReady的时候开始初始化
    $(function() {
        $(window).load(function(){
        var $wrap_1 = $('#uploader_1'),

            // 图片容器
            $queue_1 = $( '<ul class="filelist"></ul>' )
                .appendTo( $wrap_1.find( '.queueList' ) ),

            // 状态栏，包括进度和控制按钮
            $statusBar_1 = $wrap_1.find( '.statusBar' ),

            // 文件总体选择信息。
            $info_1 = $statusBar_1.find( '.info' ),

            // 上传按钮
            $upload_1 = $wrap_1.find( '.uploadBtn' ),

            // 没选择文件之前的内容。
            $placeHolder_1 = $wrap_1.find( '.placeholder' ),

            $progress_1 = $statusBar_1.find( '.progress' ).hide(),

            // 添加的文件数量
            fileCount_1 = 0,

            // 添加的文件总大小
            fileSize_1 = 0,

            // 优化retina, 在retina下这个值是2
            ratio_1 = window.devicePixelRatio || 1,

            // 缩略图大小
            thumbnailWidth_1 = 110 * ratio_1,
            thumbnailHeight_1 = 110 * ratio_1,

            // 可能有pedding, ready, uploading, confirm, done.
            state_1 = 'pedding',

            // 所有文件的进度信息，key为file id
            percentages_1 = {},
            // 判断浏览器是否支持图片的base64
            isSupportBase64_1 = ( function() {
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
            flashVersion_1 = ( function() {
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

            supportTransition_1 = (function(){
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
            uploader_1;

        if ( !WebUploader.Uploader.support('flash') && WebUploader.browser.ie ) {

            // flash 安装了但是版本过低。
            if (flashVersion_1) {
                (function(container) {
                    window['expressinstallcallback'] = function( state_1 ) {
                        switch(state_1) {
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

                })($wrap_1);

            // 压根就没有安转。
            } else {
                $wrap_1.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
            }

            return;
        } else if (!WebUploader.Uploader.support()) {
            alert( 'Web Uploader 不支持您的浏览器！');
            return;
        }

        // 实例化
        uploader_1 = WebUploader.create({
            pick: {
                id: '#filePicker_1',
                label: '点击或拖拽上传资料文件'
            },
            formData: {
                uid: 123
            },
            dnd: '#dndArea_1',
            paste: '#uploader_1',
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
            fileSize_1Limit: 200 * 1024 * 1024,    // 200 M
            fileSingleSizeLimit: 50 * 1024 * 1024    // 50 M
        });

        // 拖拽时不接受 js, txt 文件。
        uploader_1.on( 'dndAccept', function( items ) {
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

        // uploader_1.on('filesQueued', function() {
        //     uploader_1.sort(function( a, b ) {
        //         if ( a.name < b.name )
        //           return -1;
        //         if ( a.name > b.name )
        //           return 1;
        //         return 0;
        //     });
        // });

        // 添加“添加文件”的按钮，
        uploader_1.addButton({
            id: '#filePicker2_1',
            label: '继续添加'
        });

        uploader_1.on('ready', function() {
            window.uploader_1 = uploader_1;
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
                $wrap_1 = $li.find( 'p.imgWrap' ),
                $info_1 = $('<p class="error"></p>'),

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

                    $info_1.text( text ).appendTo( $li );
                };

            if ( file.getStatus() === 'invalid' ) {
                showError( file.statusText );
            } else {
                // @todo lazyload
                $wrap_1.text( '预览中' );
                uploader_1.makeThumb( file, function( error, src ) {
                    var img;

                    if ( error ) {
                        $wrap_1.text( '不能预览' );
                        return;
                    }

                    if( isSupportBase64_1 ) {
                        img = $('<img src="'+src+'">');
                        $wrap_1.empty().append( img );
                    } else {
                        $.ajax('preview.php', {
                            method: 'POST',
                            data: src,
                            dataType:'json'
                        }).done(function( response ) {
                            if (response.result) {
                                img = $('<img src="'+response.result+'">');
                                $wrap_1.empty().append( img );
                            } else {
                                $wrap_1.text("预览出错");
                            }
                        });
                    }
                }, thumbnailWidth_1, thumbnailHeight_1 );

                percentages_1[ file.id ] = [ file.size, 0 ];
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
                    percentages_1[ file.id ][ 1 ] = 1;
                } else if ( cur === 'interrupt' ) {
                    showError( 'interrupt' );
                } else if ( cur === 'queued' ) {
                    percentages_1[ file.id ][ 1 ] = 0;
                } else if ( cur === 'progress' ) {
                    $info_1.remove();
                    $prgress.css('display', 'block');
                } else if ( cur === 'complete' ) {
                    $li.append( '<span class="success"></span>' );
                }

                $li.removeClass( 'state_1-' + prev ).addClass( 'state_1-' + cur );
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
                        uploader_1.removeFile( file );
                        return;

                    case 1:
                        file.rotation += 90;
                        break;

                    case 2:
                        file.rotation -= 90;
                        break;
                }

                if ( supportTransition_1 ) {
                    deg = 'rotate(' + file.rotation + 'deg)';
                    $wrap_1.css({
                        '-webkit-transform': deg,
                        '-mos-transform': deg,
                        '-o-transform': deg,
                        'transform': deg
                    });
                } else {
                    $wrap_1.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
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

                    //         $wrap_1.css( 'filter', "progid:DXImageTransform.Microsoft.Matrix(M11=" + cos + ",M12=" + (-sin) + ",M21=" + sin + ",M22=" + cos + ",SizingMethod='auto expand')");
                    //     }
                    // });
                }


            });

            $li.appendTo( $queue_1 );
        }

        // 负责view的销毁
        function removeFile( file ) {
            var $li = $('#'+file.id);

            delete percentages_1[ file.id ];
            updateTotalProgress();
            $li.off().find('.file-panel').off().end().remove();
        }

        function updateTotalProgress() {
            var loaded = 0,
                total = 0,
                spans = $progress_1.children(),
                percent;

            $.each( percentages_1, function( k, v ) {
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

            if ( state_1 === 'ready' ) {
                text = '选中' + fileCount_1 + '张图片，共' +
                        WebUploader.formatSize( fileSize_1 ) + '。';
            } else if ( state_1 === 'confirm' ) {
                stats = uploader_1.getStats();
                if ( stats.uploadFailNum ) {
                    text = '已成功上传' + stats.successNum+ '张照片至XX相册，'+
                        stats.uploadFailNum + '张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
                }

            } else {
                stats = uploader_1.getStats();
                text = '共' + fileCount_1 + '张（' +
                        WebUploader.formatSize( fileSize_1 )  +
                        '），已上传' + stats.successNum + '张';

                if ( stats.uploadFailNum ) {
                    text += '，失败' + stats.uploadFailNum + '张';
                }
            }

            $info_1.html( text );
        }

        function setState( val ) {
            var file, stats;

            if ( val === state_1 ) {
                return;
            }

            $upload_1.removeClass( 'state_1-' + state_1 );
            $upload_1.addClass( 'state_1-' + val );
            state_1 = val;

            switch ( state_1 ) {
                case 'pedding':
                    $placeHolder_1.removeClass( 'element-invisible' );
                    $queue_1.hide();
                    $statusBar_1.addClass( 'element-invisible' );
                    uploader_1.refresh();
                    break;

                case 'ready':
                    $placeHolder_1.addClass( 'element-invisible' );
                    $( '#filePicker2_1' ).removeClass( 'element-invisible');
                    $queue_1.show();
                    $statusBar_1.removeClass('element-invisible');
                    uploader_1.refresh();
                    break;

                case 'uploading':
                    $( '#filePicker2_1' ).addClass( 'element-invisible' );
                    $progress_1.show();
                    $upload_1.text( '暂停上传' );
                    break;

                case 'paused':
                    $progress_1.show();
                    $upload_1.text( '继续上传' );
                    break;

                case 'confirm':
                    $progress_1.hide();
                    $( '#filePicker2_1' ).removeClass( 'element-invisible' );
                    $upload_1.text( '开始上传' );

                    stats = uploader_1.getStats();
                    if ( stats.successNum && !stats.uploadFailNum ) {
                        setState( 'finish' );
                        return;
                    }
                    break;
                case 'finish':
                    stats = uploader_1.getStats();
                    if ( stats.successNum ) {
                        alert( '上传成功' );
                    } else {
                        // 没有成功的图片，重设
                        state_1 = 'done';
                        location.reload();
                    }
                    break;
            }

            updateStatus();
        }

        uploader_1.onUploadProgress = function( file, percentage ) {
            var $li = $('#'+file.id),
                $percent = $li.find('.progress span');

            $percent.css( 'width', percentage * 100 + '%' );
            percentages_1[ file.id ][ 1 ] = percentage;
            updateTotalProgress();
        };

        uploader_1.onFileQueued = function( file ) {
            fileCount_1++;
            fileSize_1 += file.size;

            if ( fileCount_1 === 1 ) {
                $placeHolder_1.addClass( 'element-invisible' );
                $statusBar_1.show();
            }

            addFile( file );
            setState( 'ready' );
            updateTotalProgress();
        };

        uploader_1.onFileDequeued = function( file ) {
            fileCount_1--;
            fileSize_1 -= file.size;

            if ( !fileCount_1 ) {
                setState( 'pedding' );
            }

            removeFile( file );
            updateTotalProgress();

        };

        uploader_1.on( 'all', function( type ) {
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

        uploader_1.onError = function( code ) {
            alert( 'Eroor: ' + code );
        };

        $upload_1.on('click', function() {
            if ( $(this).hasClass( 'disabled' ) ) {
                return false;
            }

            if ( state_1 === 'ready' ) {
                uploader_1.upload();
            } else if ( state_1 === 'paused' ) {
                uploader_1.upload();
            } else if ( state_1 === 'uploading' ) {
                uploader_1.stop();
            }
        });

        $info_1.on( 'click', '.retry', function() {
            uploader_1.retry();
        } );

        $info_1.on( 'click', '.ignore', function() {
            alert( 'todo' );
        } );

        $upload_1.addClass( 'state_1-' + state_1 );
        updateTotalProgress();
    });
    });

})( jQuery );