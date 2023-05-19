package com.a509.dummy;

import com.a509.domain.Item;
import com.a509.enums.Items;
import com.a509.repostiory.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class inputItemData implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        addItem();
    }
    private final ItemRepository itemRepository;
    private void addItem() {
        for (Items items : Items.values()) {
            Item tmp = Item.builder()
                    .name(items)
                    .point(items.getValue())
                    .price(items.getValue() * 10)
                    .build();
            itemRepository.save(tmp);
        }
    }
}
