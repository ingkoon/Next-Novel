package com.a509.service_payment.common.dummy;


import com.a509.service_payment.item.domain.Item;
import com.a509.service_payment.item.enums.ItemName;
import com.a509.service_payment.item.repostiory.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DummyData implements CommandLineRunner {
    private final ItemRepository itemRepository;
    @Override
    public void run(String... args) throws Exception {
        addItem();
    }

    private void addItem(){
        for (ItemName itemName : ItemName.values()) {
            Item tmp = Item.builder()
                    .name(itemName)
                    .price(itemName.getValue())
                    .build();
            itemRepository.save(tmp);
        }
    }

}
