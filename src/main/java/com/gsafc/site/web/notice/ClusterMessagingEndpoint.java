package com.gsafc.site.web.notice;

import com.gsafc.site.event.ClusterEvent;
import org.springframework.web.socket.server.standard.SpringConfigurator;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * Created by dengb on 2016/12/31.
 */
@ServerEndpoint(
        value = "/services/messaging/{securityCode}",
        encoders = ClusterMessagingEndpoint.Codec.class,
        decoders = ClusterMessagingEndpoint.Codec.class,
        configurator = SpringConfigurator.class
)
@ClientEndpoint(
        encoders = ClusterMessagingEndpoint.Codec.class,
        decoders = ClusterMessagingEndpoint.Codec.class
)
public class ClusterMessagingEndpoint {

    public static class Codec implements Encoder.BinaryStream<ClusterEvent>, Decoder.BinaryStream<ClusterEvent> {

        @Override
        public ClusterEvent decode(InputStream is) throws DecodeException, IOException {
            return null;
        }

        @Override
        public void encode(ClusterEvent object, OutputStream os) throws EncodeException, IOException {

        }

        @Override
        public void init(EndpointConfig config) {

        }

        @Override
        public void destroy() {

        }
    }
}
