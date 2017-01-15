(function( $ ){
    // 当domReady的时候开始初始化
    $(function() {
        $(window).load(function(){
        var $wrap_2 = $('#uploader_2'),

            // 图片容器
            $queue_2 = $( '<ul class="filelist"></ul>' )
                .appendTo( $wrap_2.find( '.queueList' ) ),

            // 状态栏，包括进度和控制按钮
            $statusBar_2 = $wrap_2.find( '.statusBar' ),

            // 文件总体选择信息。
            $info_2 = $statusBar_2.find( '.info' ),

            // 上传按钮
            $upload_2 = $wrap_2.find( '.uploadBtn' ),

            // 没选择文件之前的内容。
            $placeHolder_2 = $wrap_2.find( '.placeholder' ),

            $progress_2 = $statusBar_2.find( '.progress' ).hide(),

            // 添加的文件数量
            fileCount_2 = 0,

            // 添加的文件总大小
            fileSize_2 = 0,

            // 优化retina, 在retina下这个值是2
            ratio_2 = window.devicePixelRatio || 1,

            // 缩略图大小
            thumbnailWidth_2 = 110 * ratio_2,
            thumbnailHeight_2 = 110 * ratio_2,

            // 可能有pedding, ready, uploading, confirm, done.
            state_2 = 'pedding',

            // 所有文件的进度信息，key为file id
            percentages_2 = {},
            // 判断浏览器是否支持图片的base64
            isSupportBase64_2 = ( function() {
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
            flashVersion_2 = ( function() {
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

            supportTransition_2 = (function(){
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
            uploader_2;

        if ( !WebUploader.Uploader.support('flash') && WebUploader.browser.ie ) {

            // flash 安装了但是版本过低。
            if (flashVersion_2) {
                (function(container) {
                    window['expressinstallcallback'] = function( state_2 ) {
                        switch(state_2) {
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

                })($wrap_2);

            // 压根就没有安转。
            } else {
                $wrap_2.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
            }

            return;
        } else if (!WebUploader.Uploader.support()) {
            alert( 'Web Uploader 不支持您的浏览器！');
            return;
        }

        // 实例化
        uploader_2 = WebUploader.create({
            pick: {
                id: '#filePicker_2',
                label: '点击或拖拽上传资料文件'
            },
            formData: {
                uid: 123
            },
            dnd: '#dndArea_2',
            paste: '#uploader_2',
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
            fileSize_2Limit: 200 * 1024 * 1024,    // 200 M
            fileSingleSizeLimit: 50 * 1024 * 1024    // 50 M
        });

        // 拖拽时不接受 js, txt 文件。
        uploader_2.on( 'dndAccept', function( items ) {
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

        // uploader_2.on('filesQueued', function() {
        //     uploader_2.sort(function( a, b ) {
        //         if ( a.name < b.name )
        //           return -1;
        //         if ( a.name > b.name )
        //           return 1;
        //         return 0;
        //     });
        // });

        // 添加“添加文件”的按钮，
        uploader_2.addButton({
            id: '#filePicker2_2',
            label: '继续添加'
        });

        uploader_2.on('ready', function() {
            window.uploader_2 = uploader_2;
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
                $wrap_2 = $li.find( 'p.imgWrap' ),
                $info_2 = $('<p class="error"></p>'),

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

                    $info_2.text( text ).appendTo( $li );
                };

            if ( file.getStatus() === 'invalid' ) {
                showError( file.statusText );
            } else {
                // @todo lazyload
                $wrap_2.text( '预览中' );
                uploader_2.makeThumb( file, function( error, src ) {
                    var img;

                    if ( error ) {
                        $wrap_2.text( '不能预览' );
                        return;
                    }

                    if( isSupportBase64_2 ) {
                        img = $('<img src="'+src+'">');
                        $wrap_2.empty().append( img );
                    } else {
                        $.ajax('preview.php', {
                            method: 'POST',
                            data: src,
                            dataType:'json'
                        }).done(function( response ) {
                            if (response.result) {
                                img = $('<img src="'+response.result+'">');
                                $wrap_2.empty().append( img );
                            } else {
                                $wrap_2.text("预览出错");
                            }
                        });
                    }
                }, thumbnailWidth_2, thumbnailHeight_2 );

                percentages_2[ file.id ] = [ file.size, 0 ];
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
                    percentages_2[ file.id ][ 1 ] = 1;
                } else if ( cur === 'interrupt' ) {
                    showError( 'interrupt' );
                } else if ( cur === 'queued' ) {
                    percentages_2[ file.id ][ 1 ] = 0;
                } else if ( cur === 'progress' ) {
                    $info_2.remove();
                    $prgress.css('display', 'block');
                } else if ( cur === 'complete' ) {
                    $li.append( '<span class="success"></span>' );
                }

                $li.removeClass( 'state_2-' + prev ).addClass( 'state_2-' + cur );
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
                        uploader_2.removeFile( file );
                        return;

                    case 1:
                        file.rotation += 90;
                        break;

                    case 2:
                        file.rotation -= 90;
                        break;
                }

                if ( supportTransition_2 ) {
                    deg = 'rotate(' + file.rotation + 'deg)';
                    $wrap_2.css({
                        '-webkit-transform': deg,
                        '-mos-transform': deg,
                        '-o-transform': deg,
                        'transform': deg
                    });
                } else {
                    $wrap_2.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
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

                    //         $wrap_2.css( 'filter', "progid:DXImageTransform.Microsoft.Matrix(M11=" + cos + ",M12=" + (-sin) + ",M21=" + sin + ",M22=" + cos + ",SizingMethod='auto expand')");
                    //     }
                    // });
                }


            });

            $li.appendTo( $queue_2 );
        }

        // 负责view的销毁
        function removeFile( file ) {
            var $li = $('#'+file.id);

            delete percentages_2[ file.id ];
            updateTotalProgress();
            $li.off().find('.file-panel').off().end().remove();
        }

        function updateTotalProgress() {
            var loaded = 0,
                total = 0,
                spans = $progress_2.children(),
                percent;

            $.each( percentages_2, function( k, v ) {
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

            if ( state_2 === 'ready' ) {
                text = '选中' + fileCount_2 + '张图片，共' +
                        WebUploader.formatSize( fileSize_2 ) + '。';
            } else if ( state_2 === 'confirm' ) {
                stats = uploader_2.getStats();
                if ( stats.uploadFailNum ) {
                    text = '已成功上传' + stats.successNum+ '张照片至XX相册，'+
                        stats.uploadFailNum + '张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
                }

            } else {
                stats = uploader_2.getStats();
                text = '共' + fileCount_2 + '张（' +
                        WebUploader.formatSize( fileSize_2 )  +
                        '），已上传' + stats.successNum + '张';

                if ( stats.uploadFailNum ) {
                    text += '，失败' + stats.uploadFailNum + '张';
                }
            }

            $info_2.html( text );
        }

        function setState( val ) {
            var file, stats;

            if ( val === state_2 ) {
                return;
            }

            $upload_2.removeClass( 'state_2-' + state_2 );
            $upload_2.addClass( 'state_2-' + val );
            state_2 = val;

            switch ( state_2 ) {
                case 'pedding':
                    $placeHolder_2.removeClass( 'element-invisible' );
                    $queue_2.hide();
                    $statusBar_2.addClass( 'element-invisible' );
                    uploader_2.refresh();
                    break;

                case 'ready':
                    $placeHolder_2.addClass( 'element-invisible' );
                    $( '#filePicker2_2' ).removeClass( 'element-invisible');
                    $queue_2.show();
                    $statusBar_2.removeClass('element-invisible');
                    uploader_2.refresh();
                    break;

                case 'uploading':
                    $( '#filePicker2_2' ).addClass( 'element-invisible' );
                    $progress_2.show();
                    $upload_2.text( '暂停上传' );
                    break;

                case 'paused':
                    $progress_2.show();
                    $upload_2.text( '继续上传' );
                    break;

                case 'confirm':
                    $progress_2.hide();
                    $( '#filePicker2_2' ).removeClass( 'element-invisible' );
                    $upload_2.text( '开始上传' );

                    stats = uploader_2.getStats();
                    if ( stats.successNum && !stats.uploadFailNum ) {
                        setState( 'finish' );
                        return;
                    }
                    break;
                case 'finish':
                    stats = uploader_2.getStats();
                    if ( stats.successNum ) {
                        alert( '上传成功' );
                    } else {
                        // 没有成功的图片，重设
                        state_2 = 'done';
                        location.reload();
                    }
                    break;
            }

            updateStatus();
        }

        uploader_2.onUploadProgress = function( file, percentage ) {
            var $li = $('#'+file.id),
                $percent = $li.find('.progress span');

            $percent.css( 'width', percentage * 100 + '%' );
            percentages_2[ file.id ][ 1 ] = percentage;
            updateTotalProgress();
        };

        uploader_2.onFileQueued = function( file ) {
            fileCount_2++;
            fileSize_2 += file.size;

            if ( fileCount_2 === 1 ) {
                $placeHolder_2.addClass( 'element-invisible' );
                $statusBar_2.show();
            }

            addFile( file );
            setState( 'ready' );
            updateTotalProgress();
        };

        uploader_2.onFileDequeued = function( file ) {
            fileCount_2--;
            fileSize_2 -= file.size;

            if ( !fileCount_2 ) {
                setState( 'pedding' );
            }

            removeFile( file );
            updateTotalProgress();

        };

        uploader_2.on( 'all', function( type ) {
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

        uploader_2.onError = function( code ) {
            alert( 'Eroor: ' + code );
        };

        $upload_2.on('click', function() {
            if ( $(this).hasClass( 'disabled' ) ) {
                return false;
            }

            if ( state_2 === 'ready' ) {
                uploader_2.upload();
            } else if ( state_2 === 'paused' ) {
                uploader_2.upload();
            } else if ( state_2 === 'uploading' ) {
                uploader_2.stop();
            }
        });

        $info_2.on( 'click', '.retry', function() {
            uploader_2.retry();
        } );

        $info_2.on( 'click', '.ignore', function() {
            alert( 'todo' );
        } );

        $upload_2.addClass( 'state_2-' + state_2 );
        updateTotalProgress();
    });
    });

})( jQuery );