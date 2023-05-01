package com.a509.service_payment.item.service;

import com.a509.service_payment.item.domain.Item;
import com.a509.service_payment.item.dto.ItemRequestDto;
import com.a509.service_payment.item.dto.ItemResponseDto;
import com.a509.service_payment.item.exception.NoSuchItemException;
import com.a509.service_payment.item.repostiory.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ItemService {
    private final ItemRepository itemRepository;

    public List<ItemResponseDto> searchItemList(){
        List<Item> items = itemRepository.findAll();
        List<ItemResponseDto> result = items
                .stream()
                .map(ItemResponseDto::new)
                .collect(Collectors.toList());
        return result;
    }

    public ItemResponseDto searchItem(Long itemId){
        Item item = itemRepository
                .findById(itemId)
                .orElseThrow(NoSuchItemException::new);
        return new ItemResponseDto().fromEntity(item);
    }
}
