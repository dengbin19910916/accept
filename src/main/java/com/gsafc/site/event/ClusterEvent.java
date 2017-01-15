package com.gsafc.site.event;

import org.springframework.context.ApplicationEvent;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.Serializable;

/**
 * Created by dengb on 2016/12/31.
 */
public class ClusterEvent extends ApplicationEvent implements Serializable {

    private final Serializable serializableSource;
    private boolean rebroadcasted;

    /**
     * Create a new ApplicationEvent.
     *
     * @param source the object on which the event initially occurred (never {@code null})
     */
    public ClusterEvent(Serializable source) {
        super(source);
        this.serializableSource = source;
    }

    public final boolean isRebroadcasted() {
        return rebroadcasted;
    }

    public final void setRebroadcasted() {
        this.rebroadcasted = true;
    }

    @Override
    public Object getSource() {
        return serializableSource;
    }

    private void readObject(ObjectInputStream inputStream) throws IOException, ClassNotFoundException {
        inputStream.defaultReadObject();
        this.source = serializableSource;
    }
}
