package orchestrator.event;


import lombok.Getter;

@Getter
public class OrderCreateEvent {
    public Long id;
    private Long memberId;
    private Long price;
    private String receiptId;
}
